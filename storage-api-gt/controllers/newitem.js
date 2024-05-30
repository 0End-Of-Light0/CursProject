const init = require("../models/init-models");
const sequelize = require("../config/db");
const e = require("express");
var models = init(sequelize);

exports.newitem = async (req, res) => {
    try {
        console.log("-------------------------------------",parseFloat(req.headers.width))
        const product = await models.Product.findOne({
            include: [
              {
                model: models.Type,
                as: 'type',
                where: {
                    typename: req.headers.type
                },
                required: true
              },
              {
                model: models.Distributor,
                as: 'distributor',
                where: {
                    distributorname: req.headers.distributor
                },
                required: true
              },
              {
                model: models.Warehouse,
                as: 'warehouse',
                where: {
                    warehouseadressadress: req.headers.adress,
                    warehousenumber: req.headers.number,
                    warehousesection: req.headers.section,
                    warehouseshelf: req.headers.shelf,
                    warehousecell: req.headers.cell
                },
                required: true
              },
              {
                model: models.Specification,
                as: 'specification',
                where: {
                    specificationweight: parseFloat(req.headers.weight),
                    specificationcount: req.headers.count,
                    specificationprice: req.headers.price
                },
                include: [
                  {
                    model: models.Size,
                    as: 'size',
                    where: {
                            sizelength: parseFloat(req.headers.length),
                            sizewidth: parseFloat(req.headers.width),
                            sizeheight: parseFloat(req.headers.height)
                    },
                    required: true
                  },
                ],
                required: true
              },
            ],
            where: {
                productarrival: req.headers.arrival,
                productname: req.headers.name,
                productinwarehouse: true
            }
          });
        if (product) {
            return res.status(404).json({ message: "Product already exists." });
        }
        const type = await models.Type.findOne({
            where: {
                typename: req.headers.type
            }
        });
        if (!type && req.headers.type != undefined) {
            const type = await models.Type.create({
                typename: req.headers.type
            });
        }
        const distributor = await models.Distributor.findOne({
            where: {
                distributorname: req.headers.distributor
            }
        })
        if (!distributor && req.headers.distributor != undefined) {
            const distributor = await models.Distributor.create({
                distributorname: req.headers.distributor
            })
        }

        const warehouse = await models.Warehouse.findOne({
            where: {
                warehouseadressadress: req.headers.adress,
                warehousenumber: req.headers.number,
                warehousesection: req.headers.section,
                warehouseshelf: req.headers.shelf,
                warehousecell: req.headers.cell
            }
        })
        if (!warehouse && req.headers.adress != undefined && req.headers.shelf != undefined && req.headers.cell != undefined) {
            const warehouse = await models.Warehouse.create({
                warehouseadressadress: req.headers.adress,
                warehousenumber: req.headers.number,
                warehousesection: req.headers.section,
                warehouseshelf: req.headers.shelf,
                warehousecell: req.headers.cell
            })
        }
        else if (warehouse) {
            const aprod = await models.Product.findAll({
                where: {
                    warehouseid: warehouse.warehouseid
                }
            }) 
            var aprods = JSON.stringify(aprod, null, 2)
            for (let i = 0; i < aprod.length; i++) {
                if (aprod[i].productinwarehouse == true) {
                    return res.status(500).json({ message: "This adress already has item" });
                }
            }
        }
        else if (!warehouse) {
            return res.status(500).json({ message: "Invalid or Empty Adress" });
        }
        const size = await models.Size.findOne({
            where: {
                sizelength: parseFloat(req.headers.length),
                sizewidth: parseFloat(req.headers.width),
                sizeheight: parseFloat(req.headers.height)
            }
        })
        console.log(req.headers.length, req.headers.width, req.headers.height);
        if (!size && req.headers.length != undefined && req.headers.width != undefined && req.headers.height != undefined) {
            const size = await models.Size.create({
                sizelength: parseFloat(req.headers.length),
                sizewidth: parseFloat(req.headers.width),
                sizeheight: parseFloat(req.headers.height)
            })
        }
        if (!size) {
            return res.status(500).json({ message: "Invalid or Empty Size" });
        }
        const spec = await models.Specification.findOne({
            sizeid: size.sizeid,
            specificationweight: parseFloat(req.headers.weight),
            specificationcount: req.headers.count,
            specificationprice: req.headers.price
        })
        console.log(req.headers.weight, req.headers.count, req.headers.price);
        if (!spec && req.headers.weight != undefined && req.headers.count != undefined && req.headers.price != undefined) {
            const spec = await models.Specification.create({
                sizeid: size.sizeid,
                specificationweight: parseFloat(req.headers.weight),
                specificationcount: req.headers.count,
                specificationprice: req.headers.price
            })
        }
        if (!spec) {
            return res.status(500).json({ message: "Invalid or Empty Specification" });
        }
        if (req.headers.arrival != undefined && req.headers.inwarehouse != undefined && req.headers.name && spec && size && warehouse && type && distributor) {
            const item = await models.Product.create({
                productname: req.headers.name,
                warehouseid: warehouse.warehouseid,
                typeid: type.typeid,
                distributorid: distributor.distributorid,
                specificationid: spec.specificationid,
                productarrival: req.headers.arrival,
                productinwarehouse: req.headers.inwarehouse
            })   
        }
        else {
            return res.status(500).json({ message: "Invalid or Empty arrival or inwarehouse" });
        }
        return res.status(200).json({ message: "Item was created successfully!" });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }
}