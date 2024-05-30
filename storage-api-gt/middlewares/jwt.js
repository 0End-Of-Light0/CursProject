const jwt = require("jsonwebtoken");
const config = require("../config/secretkey.js");
const init = require("../models/init-models");
const sequelize = require("../config/db");
const bcrypt = require("bcryptjs");
var models = init(sequelize);
var user = {};

verifyToken = (req, res, next) => {
  let token = req.session.token;
  console.log(token);

  if (!token) {
    return res.status(403).json({
      message: "No token provided!",
    });
  }

  jwt.verify(token,
             config.secret,
             (err, decoded) => {
              if (err) {
                return res.status(401).json({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              console.log(req.userId);
              next();
             });
};

isUserA = async (req, res, next) => {
  try {
    if (req.headers.phone != undefined) {
      user = await models.User.findOne({
        include: [
          {
            model: models.UserInfo,
            as: 'userinfo',
            where: {
              userinfoemail: req.headers.phone,
            },
            required: true
          },
          {
            model: models.Authentication,
            as: 'authentication',
            required: true
          },
          {
            model: models.Position,
            as: 'position',
            required: true
          }
        ]
      });
      if (!user) {
          return res.status(400).json({
            message: "Failed! This User does not exist!",
          });
        }
  }
  else if (req.headers.email != undefined) {
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
        {
          model: models.Position,
          as: 'position',
          required: true
        }
      ]
    });

    if (!user) {
        return res.status(400).json({
            message: "Failed! This User does not exist!",
          });
      }
  }
  else {
      return res.status(400).json({
        message: "Failed! Empty email and phone!",
      });
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
  if (user.position.positionname === "User"  || user.position.positionname === "Admin") {
      return next();
    }
  return res.status(403).json({
      message: "Require User Role!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to validate User role!",
      error: error.message
    });
  }
};


isAdminA = async (req, res, next) => {
  try {
    if (req.headers.phone != undefined) {
      user = await models.User.findOne({
        include: [
          {
            model: models.UserInfo,
            as: 'userinfo',
            where: {
              userinfoemail: req.headers.phone,
            },
            required: true
          },
          {
            model: models.Authentication,
            as: 'authentication',
            required: true
          },
          {
            model: models.Position,
            as: 'position',
            required: true
          }
        ]
      });
      if (!user) {
          return res.status(400).json({
            message: "Failed! This User does not exist!",
          });
        }
  }
  else if (req.headers.email != undefined) {
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
        {
          model: models.Position,
          as: 'position',
          required: true
        }
      ]
    });

    if (!user) {
        return res.status(400).json({
            message: "Failed! This User does not exist!",
          });
      }
  }
  else {
      return res.status(400).json({
        message: "Failed! Empty email and phone!",
      });
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
  if (user.position.positionname === "User") {
      return next();
    }
  return res.status(403).json({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to validate Admin role!",
      error: error.message
    });
  }
};

isUser = async (req, res, next) => {
  try {
    const user = await models.User.findByPk(req.userId);
    const role = await models.Position.findOne({
        where: {
            positionid: user.positionid
        }
    });
    if (role.positionname === "User" || user.position.positionname === "Admin") {
        return next();
    }
    return res.status(403).json({
      message: "Require User Role!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to validate User role!",
    });
  }
};

isAdmin = async (req, res, next) => {
  try {
    const user = await models.User.findByPk(req.userId);
    const role = await models.Position.findOne({
        where: {
            positionid: user.positionid
        }
    });
    if (role.positionname === "Admin") {
        return next();
    }
    return res.status(403).json({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to validate Admin role!",
      error: error.message
    });
  }
};

const authJwt = {
  verifyToken,
  isUser,
  isAdmin,
  isUserA,
  isAdminA
};
module.exports = authJwt;
