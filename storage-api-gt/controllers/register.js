const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const init = require("../models/init-models");
const sequelize = require("../config/db");
var models = init(sequelize);
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

exports.register = async (req, res) => {
    // Save User to Database
    try {
      if (req.headers.username != '' && (!phoneRegex.test(req.headers.phone) && emailRegex.test(req.headers.email)) && req.headers.password != '') {
        const auth = await models.Authentication.create({
          password: bcrypt.hashSync(req.headers.password, 8)
        })
        const userinfo = await models.UserInfo.create({
          userinfoname: req.headers.username,
          userinfosurname: req.headers.surname,
          userinfopatronymic: req.headers.patronymic,
          userinfoemail: req.headers.email
        });
        const user = await models.User.create({
          userinfoid: userinfo.userinfoid,
          positionid: 3,
          authenticationid: auth.authenticationid
        });
        res.status(200).json({ message: "User was registered successfully!" });
      }
      else if (req.headers.username != '' && (phoneRegex.test(req.headers.phone) && !emailRegex.test(req.headers.email)) && req.headers.password != '') {
        const auth = await models.Authentication.create({
          password: bcrypt.hashSync(req.headers.password, 8)
        })
        const userinfo = await models.UserInfo.create({
          userinfoname: req.headers.username,
          userinfosurname: req.headers.surname,
          userinfopatronymic: req.headers.patronymic,
          userinfophone: req.headers.phone
        });
        const user = await models.User.create({
          userinfoid: userinfo.userinfoid,
          positionid: 3,
          authenticationid: auth.authenticationid
        });
        res.status(200).json({ message: "User was registered successfully!" });
      }
      else if (req.headers.username != '' && (phoneRegex.test(req.headers.phone) && emailRegex.test(req.headers.email)) && req.headers.password != '') {
        const auth = await models.Authentication.create({
          password: bcrypt.hashSync(req.headers.password, 8)
        })
        const userinfo = await models.UserInfo.create({
          userinfoname: req.headers.username,
          userinfosurname: req.headers.surname,
          userinfopatronymic: req.headers.patronymic,
          userinfophone: req.headers.phone,
          userinfoemail: req.headers.email
        });
        const user = await models.User.create({
          userinfoid: userinfo.userinfoid,
          positionid: 3,
          authenticationid: auth.authenticationid
        });
        res.status(200).json({ message: "User was registered successfully!" });
      }
      else {
        res.status(500).json({ message: "User data is invalid!"});
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
