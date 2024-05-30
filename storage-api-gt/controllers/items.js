const init = require("../models/init-models");
const sequelize = require("../config/db");
const e = require("express");
var models = init(sequelize);

exports.items = async (req, res) => {
    try {
        if (req.headers.type != undefined) {
        const items = await models.Product.findAll({
            include: [
              {
                model: models.Type,
                as: 'type',
                where: {
                    typename: req.headers.type,
                },
                required: true
              },
              {
                model: models.Distributor,
                as: 'distributor',
                required: true
              },
              {
                model: models.Warehouse,
                as: 'warehouse',
                required: true
              },
              {
                model: models.Specification,
                as: 'specification',
                include: [
                  {
                    model: models.Size,
                    as: 'size',
                    required: true
                  },
                ],
                required: true
              },
            ],
            where: {
                productinwarehouse: true
            }
          });
          return res.status(200).json(items);
        }
        else {
            return res.status(500).json({ message: "No type provided" });
        }
    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
      }
}