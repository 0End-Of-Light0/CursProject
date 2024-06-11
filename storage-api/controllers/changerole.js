const init = require("../models/init-models");
const sequelize = require("../config/db");
var models = init(sequelize);
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var user = {};
function ServerException(message) {
    this.message = message;
    this.name = "Служебная ошибка";
  }
exports.role = async (req, res) => {
    try {
        if (phoneRegex.test(req.headers.cphone)){
            user = await models.userinfo.findOne({
                where: {
                  user_info_phone: req.headers.cphone
                }
              });
              if (!user) {
                throw new ServerException("User Not found.");
              }
        }
        else if (emailRegex.test(req.headers.cemail)){
            user = await models.userinfo.findOne({
                where: {
                  user_info_email: req.headers.cemail
                }
              });
              console.log(req.headers.cemail)
              if (!user) {
                throw new ServerException("User Not found.");
              }
        }
        else {
            throw new ServerException("Invalid phone or email");
        }
        const usert = await models.user.findOne({
            where: {
                user_info_id: user.user_info_id
            }
        })
        const role = await models.position.findOne({
            where: {
                position_name: req.headers.position
            }
        });
        if (!role) {
            throw new ServerException("Role Not found.");
        }
        const checku = await models.user.findOne({
            where: {
                position_id: role.position_id,
                user_id: usert.user_id
            }
        })
        if (checku) {
            throw new ServerException("User has already this role.");
        }
        const user1 = await models.user.update({
            position_id: role.position_id
        }, {
            where: {
                user_id: usert.user_id
            }
        });
        return res.status(200).json({ message: "Success!", newrole: role.position_name });
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
      }
};