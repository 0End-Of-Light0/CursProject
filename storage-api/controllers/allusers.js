const init = require("../models/init-models");
const sequelize = require("../config/db");
const e = require("express");
var models = init(sequelize);
function ServerException(message) {
    this.message = message;
    this.name = "Служебная ошибка";
  }
exports.allusers = async (req, res) => {
    try {
        const users = await models.user.findAll({
            include: [
                {
                  model: models.userinfo,
                  as: 'user_info',
                  required: true
                },
                {
                  model: models.position,
                  as: 'position',
                  required: true
                },
              ],
        });
        if (users) {
            res.status(200).json(users)
        }
        else {
            throw new ServerException("Unknown error");
        }
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}