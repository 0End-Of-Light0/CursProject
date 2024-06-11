const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const init = require("../models/init-models");
const sequelize = require("../config/db");
var models = init(sequelize);
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const config = require("../config/secretkey.js");
var user = {};
function ServerException(message) {
  this.message = message;
  this.name = "Служебная ошибка";
}
exports.login = async (req, res) => {
    try {
    if (emailRegex.test(req.headers.email)) {
      user = await models.user.findOne({
        include: [
          {
            model: models.userinfo,
            as: 'user_info',
            where: {
              user_info_email: req.headers.email,
            },
            required: true
          },
          {
            model: models.authentication,
            as: 'authentication',
            required: true
          },
          {
            model: models.position,
            as: 'position',
            required: true
          },
        ]
      });
      if (!user) {
        throw new ServerException("User Not found.");
      }
    }
    else if (phoneRegex.test(req.headers.phone)) {

        user = await models.user.findOne({
          include: [
            {
                model: models.userinfo,
                as: 'user_info',
                where: {
                  user_info_phone: req.headers.phone,
                },
                required: true
            },
            {
                model: models.authentication,
                as: 'authentication',
                required: true
            },
            {
                model: models.position,
                as: 'position',
                required: true
            },
            ]
          });
      
          if (!user) {
            throw new ServerException("User Not found.");
          }
    }
    else {
        throw new ServerException("Invalid phone or email");
    }
      const passwordIsValid = bcrypt.compareSync(
        req.headers.password,
        user.authentication.password
      );
  
      if (!passwordIsValid) {
        return res.status(401).json({
          message: "Invalid Password!",
        });
      }
  
      const token = jwt.sign({ id: user.userid },
                             config.secret,
                             {
                              algorithm: 'HS256',
                              allowInsecureKeySizes: true,
                              expiresIn: 86400, // 24 hours
                             });
      
      req.session.token = token;
      return res.status(200).json({login: user.user_info.user_info_email,password: req.headers.password, position: user.position.position_name});
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: error.message });
    }
  };