const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const init = require("../models/init-models");
const sequelize = require("../config/db");
var models = init(sequelize);
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const config = require("../config/secretkey.js");
const cookiep = require("cookie-parser");
var user = {};
exports.login = async (req, res) => {
    try {
    if (emailRegex.test(req.headers.email)) {
      user = await models.User.findOne({
        include: [
          {
            model: models.UserInfo,
            as: 'userinfo',
            where: {
              userinfoemail: req.headers.email,
            },
            required: true
          },
          {
            model: models.Authentication,
            as: 'authentication',
            required: true
          },
        ]
      });
      if (!user) {
        return res.status(404).json({ message: "User Not found." });
      }
    }
    else if (phoneRegex.test(req.headers.phone)) {

        user = await models.User.findOne({
          include: [
            {
              include: {
                model: models.UserInfo,
                as: 'userinfo',
                where: {
                  userinfophone: req.headers.phone,
                },
                required: true
              },
            },
            {
              include: {
                model: models.Authentication,
                as: 'authentication',
                required: true
              },
            },
            ]
          });
      
          if (!user) {
            return res.status(404).json({ message: "User Not found." });
          }
    }
    else {
        return res.status(404).json({ message: "Invalid phone or email" });
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
      return res.status(200).json({
        message: "Login success!"
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };