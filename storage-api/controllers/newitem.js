const init = require("../models/init-models");
const sequelize = require("../config/db");
const e = require("express");
var models = init(sequelize);
var warehouse = {};
var size = {};
var spec = {};
var type = {};
var distributor = {};
var item = {};
function ServerException(message) {
    this.message = message;
    this.name = "Служебная ошибка";
  }
exports.newitem = async (req, res) => {
    try {
        if (req.headers.type === undefined || req.headers.distributor === undefined || req.headers.adress === undefined || req.headers.shelf === undefined || req.headers.cell === undefined || req.headers.length === undefined || req.headers.width === undefined || req.headers.height === undefined || req.headers.weight === undefined || req.headers.count === undefined || req.headers.price === undefined || req.headers.arrival === undefined || req.headers.name === undefined || req.headers.inwarehouse === undefined)
        {
            throw new ServerException("Needed param not found!");
        }
        console.log(req.headers.price)
        const product = await models.product.findOne({
            include: [
              {
                model: models.type,
                as: 'type',
                where: {
                    type_name: req.headers.type
                },
                required: true
              },
              {
                model: models.distributor,
                as: 'distributor',
                where: {
                    distributor_name: req.headers.distributor
                },
                required: true
              },
              {
                model: models.warehouse,
                as: 'warehouse',
                where: {
                    warehouse_adress: req.headers.adress,
                    warehouse_number: req.headers.number,
                    warehouse_section: req.headers.section,
                    warehouse_shelf: req.headers.shelf,
                    warehouse_cell: req.headers.cell
                },
                required: true
              },
              {
                model: models.specification,
                as: 'specification',
                where: {
                    specification_weight: req.headers.weight,
                    specification_count: req.headers.count,
                    specification_price: req.headers.price
                },
                include: [
                  {
                    model: models.size,
                    as: 'size',
                    where: {
                            size_length: req.headers.length,
                            size_width: req.headers.width,
                            size_height: req.headers.height
                    },
                    required: true
                  },
                ],
                required: true
              },
            ],
            where: {
                product_arrival: req.headers.arrival,
                product_name: req.headers.name,
                product_in_warehouse: true
            }
          });
        if (product) {
            throw new ServerException("Product already exists.");
        }
        type = await models.type.findOne({
            where: {
                type_name: req.headers.type
            }
        });
        if (!type || req.headers.type != undefined) {
            type = await models.type.create({
                type_name: req.headers.type
            });
        }
        distributor = await models.distributor.findOne({
            where: {
                distributor_name: req.headers.distributor
            }
        })
        if (!distributor || req.headers.distributor != undefined) {
            distributor = await models.distributor.create({
                distributor_name: req.headers.distributor
            })
        }
        warehouse = await models.warehouse.findOne({
            where: {
                warehouse_adress: req.headers.adress,
                warehouse_number: req.headers.number,
                warehouse_section: req.headers.section,
                warehouse_shelf: req.headers.shelf,
                warehouse_cell: req.headers.cell
            }
        })
        if (!warehouse && req.headers.adress != undefined && req.headers.shelf != undefined && req.headers.cell != undefined) {
            warehouse = await models.warehouse.create({
                warehouse_adress: req.headers.adress,
                warehouse_number: req.headers.number,
                warehouse_section: req.headers.section,
                warehouse_shelf: req.headers.shelf,
                warehouse_cell: req.headers.cell
            })
        }
        else if (warehouse.warehouse_id != undefined) {
            const aprod = await models.product.findAll({
                where: {
                    warehouse_id: warehouse.warehouse_id
                }
            }) 
            var aprods = JSON.stringify(aprod, null, 2)
            for (let i = 0; i < aprod.length; i++) {
                if (aprod[i].product_in_warehouse == true) {
                    throw new ServerException("This adress already has item");
                }
            }
        }
        else if (warehouse.warehouse_id === undefined) {
            throw new ServerException("Invalid or Empty Adress");
        }
        size = await models.size.findOne({
            where: {
                size_length: req.headers.length,
                size_width: req.headers.width,
                size_height: req.headers.height
            }
        })
        if (!size && req.headers.length != undefined && req.headers.width != undefined && req.headers.height != undefined) {
            size = await models.size.create({
                size_length: req.headers.length,
                size_width: req.headers.width,
                size_height: req.headers.height
            })
        }
        if (!size) {
            throw new ServerException("Invalid or Empty Size");
        }
        spec = await models.specification.findOne({
            where: {
                size_id: size.size_id,
                specification_weight: req.headers.weight,
                specification_count: req.headers.count,
                specification_price: req.headers.price
            }
        })
        if (!spec && req.headers.weight != undefined && req.headers.count != undefined && req.headers.price != undefined) {
            spec = await models.specification.create({
                size_id: size.size_id,
                specification_weight: req.headers.weight,
                specification_count: req.headers.count,
                specification_price: req.headers.price
            })
        }
        if (!spec) {
            throw new ServerException("Invalid or Empty Specification");
        }
        if (req.headers.arrival != undefined && req.headers.inwarehouse != undefined && req.headers.name && spec && size && warehouse && type && distributor) {
            item = await models.product.create({
                product_name: req.headers.name,
                warehouse_id: warehouse.warehouse_id,
                type_id: type.type_id,
                distributor_id: distributor.distributor_id,
                specification_id: spec.specification_id,
                product_arrival: req.headers.arrival,
                product_in_warehouse: req.headers.inwarehouse,
                product_description: req.headers.description
            })   
        }
        else {
            throw new ServerException("Invalid or Empty arrival or inwarehouse");
        }
        if (item) {
            return res.status(200).json({message: "Item was created successfully!"});
        }
        else {
            throw new ServerException( "Unknown error!");
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
}