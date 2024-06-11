const init = require("../models/init-models");
const sequelize = require("../config/db");
const e = require("express");
var models = init(sequelize);
function ServerException(message) {
  this.message = message;
  this.name = "Служебная ошибка";
}
exports.changeitem = async (req, res) => {
    try {
        if (req.headers.prodid != undefined)
        {
            const prodf = await models.find.findOne({
                where: {
                    product_id: req.headers.prodid
                }
            })
            if (!prodf) {
                throw new ServerException("No item with this id found");
            }
            const product = await models.product.update({
                include: [
                  {
                    model: models.type,
                    as: 'type',
                    type_name: req.headers.type,
                    required: true
                  },
                  {
                    model: models.distributor,
                    as: 'distributor',
                    distributor_name: req.headers.distributor,
                    required: true
                  },
                  {
                    model: models.warehouse,
                    as: 'warehouse',
                    warehouse_adress: req.headers.adress,
                    warehouse_number: req.headers.number,
                    warehouse_section: req.headers.section,
                    warehouse_shelf: req.headers.shelf,
                    warehouse_cell: req.headers.cell,
                    required: true
                  },
                  {
                    model: models.specification,
                    as: 'specification',
                    specification_weight: parseFloat(req.headers.weight),
                    specification_count: req.headers.count,
                    specification_price: req.headers.price,
                    include: [
                      {
                        model: models.size,
                        as: 'size',
                        size_length: parseFloat(req.headers.length),
                        size_width: parseFloat(req.headers.width),
                        size_height: parseFloat(req.headers.height),
                        required: true
                      },
                    ],
                    required: true
                  },
                ],
                product_arrival: req.headers.arrival,
                product_name: req.headers.name,
                product_in_warehouse: req.headers.inwarehouse,
                product_description: req.headers.product_description,
              }, {
                where: {
                    product_id: req.headers.prodid
                }
              });
              if (product) {
                return res.status(200).json({message: "Product changed!"})
              }
              else {
                return res.status(500).json({message: "Unknown error!"})
              }
        }
        else {
            throw new ServerException("Productid empty");
        }
    }
    catch(error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};