const init = require("../models/init-models");
const sequelize = require("../config/db");
const e = require("express");
var models = init(sequelize);
var user = {};
function ServerException(message) {
    this.message = message;
    this.name = "Служебная ошибка";
  }
exports.history = async (req, res) => {
    try {
        if (req.headers.email != undefined) {
            user = await models.user.findOne({
                include: [
                    {
                      model: models.userinfo,
                      as: 'user_info',
                      where: {
                        user_info_email: req.headers.email,
                      },
                      required: true
                    },
                ]
            });
        }
        else {
            user = await models.user.findOne({
                include: [
                    {
                      model: models.userinfo,
                      as: 'user_info',
                      where: {
                        user_info_phone: req.headers.phone,
                      },
                      required: true
                    },
                ]
            });
        }
        if (!user) {
            throw new ServerException("Invalid phone or email!");
        }
        const product = await models.product.findOne({
            where: {
                product_id: req.headers.prodid
            }
        })
        if (!product){
            throw new ServerException("Invalid product_id");
        }
        var prevadress = models.warehouse.findOne({
            where: {
                warehouse_adress: req.headers.padress,
                warehouse_number: req.headers.pnumber,
                warehouse_section: req.headers.psection,
                warehouse_shelf: req.headers.pshelf,
                warehouse_cell: req.headers.pcell
            }
        })
        var newadress = models.warehouse.findOne({
            where: {
                warehouse_adress: req.headers.adress,
                warehouse_number: req.headers.number,
                warehouse_section: req.headers.section,
                warehouse_shelf: req.headers.shelf,
                warehouse_cell: req.headers.cell
            }
        })
        if (!prevadress) {
            if (req.headers.padress || req.headers.pnumber || req.headers.pshelf || req.headers.pcell) {
                prevadress = models.warehouse.create({
                    where: {
                        warehouse_adress: req.headers.padress,
                        warehouse_number: req.headers.pnumber,
                        warehouse_section: req.headers.psection,
                        warehouse_shelf: req.headers.pshelf,
                        warehouse_cell: req.headers.pcell
                    }
                })
            }
        }
        if (!newadress) {
            if (req.headers.adress || req.headers.number || req.headers.shelf || req.headers.cell) {
                newadress = models.warehouse.create({
                    where: {
                        warehouse_adress: req.headers.adress,
                        warehouse_number: req.headers.number,
                        warehouse_section: req.headers.section,
                        warehouse_shelf: req.headers.shelf,
                        warehouse_cell: req.headers.cell
                    }
                })
            }
        }
        if (!prevadress || !newadress) {
            throw new ServerException("Invalid previous adress or new adress");
        }
        const history = await models.producthistory.create({
            user_id: user.user_id,
            product_id: product.product_id,
            prevadress: prevadress.warehouse_id,
            newadress: newadress.warehouse_id,
            product_history_transition_time: timet,
        });
        if (!history) {
            throw new ServerException("Unknown error(history)!");
        }
        const product1 = await models.product.update({
            where: {
                product_id: req.headers.prodid
            },
            warehouse_id: newadress.warehouse_id,
        });
        if (product1) {
            return res.status(200).json({message: "Success!"})
        }
    }
    catch(error) {
        return res.status(500).json({ message: error.message });
    }
}