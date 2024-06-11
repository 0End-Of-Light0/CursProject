const init = require("../models/init-models");
const sequelize = require("../config/db");
const e = require("express");
var models = init(sequelize);
function ServerException(message) {
  this.message = message;
  this.name = "Служебная ошибка";
}
exports.items = async (req, res) => {
    try {
        if (req.headers.type != undefined) {
        const items = await models.product.findAll({
            include: [
              {
                model: models.type,
                as: 'type',
                where: {
                    type_name: req.headers.type,
                },
                required: true
              },
              {
                model: models.distributor,
                as: 'distributor',
                required: true
              },
              {
                model: models.warehouse,
                as: 'warehouse',
                required: true
              },
              {
                model: models.specification,
                as: 'specification',
                include: [
                  {
                    model: models.size,
                    as: 'size',
                    required: true
                  },
                ],
                required: true
              },
            ],
            where: {
                product_in_warehouse: true
            }
          });
          return res.status(200).json(items);
        }
        else {
            throw new ServerException("No type provided");
        }
    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
      }
}