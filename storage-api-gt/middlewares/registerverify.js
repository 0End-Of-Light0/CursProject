const init = require("../models/init-models");
const sequelize = require("../config/db");
var models = init(sequelize);

exports.checkDuplicate = async (req, res, next) => {
  try {
    // Username
    if (req.headers.phone != undefined) {
        let user = await models.UserInfo.findOne({
            where: {
              userinfophone: req.headers.phone
            }
          });
        if (user) {
            return res.status(400).json({
              message: "Failed! This phone is already in use!"
            });
          }
    }
    else if (req.headers.email != undefined) {
        user = await models.UserInfo.findOne({
            where: {
              userinfoemail: req.headers.email
            }
          });
      
          if (user) {
            return res.status(400).json({
              message: "Failed! Email is already in use!"
            });
          }
    }
    else {
        return res.status(400).json({
          message: "Failed! Empty email and phone!"
        });
    }
    // Email
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Unable to validate Username!"
    });
  }
};