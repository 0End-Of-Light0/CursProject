const init = require("../models/init-models");
const sequelize = require("../config/db");
var models = init(sequelize);
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
var user = {};
exports.role = async (req, res) => {
    try {
        if (phoneRegex.test(req.headers.phone)){
            user = await models.UserInfo.findOne({
                where: {
                  userinfophone: req.headers.cphone
                }
              });
              if (!user) {
                return res.status(404).json({ message: "User Not found." });
              }
        }
        else if (emailRegex.test(req.headers.email)){
            user = await models.UserInfo.findOne({
                where: {
                  userinfoemail: req.headers.cemail
                }
              });
              if (!user) {
                return res.status(404).json({ message: "User Not found." });
              }
        }
        else {
            return res.status(404).json({ message: "Invalid phone or email" });
        }
        const usert = await models.User.findOne({
            where: {
                userinfoid: user.userinfoid
            }
        })
        const role = await models.Position.findOne({
            where: {
                positionname: req.headers.position
            }
        });
        if (!role) {
            return res.status(404).json({ message: "Role Not found." });
        }
        const checku = await models.User.findOne({
            where: {
                positionid: role.positionid,
                userid: usert.userid
            }
        })
        if (checku) {
            return res.status(404).json({ message: "User has already this role." });
        }
        const user1 = await models.User.update({
            positionid: role.positionid
        }, {
            where: {
                userid: usert.userid
            }
        });
        return res.status(200).json({ message: "Success!", newrole: role.positionname });
    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
      }
};