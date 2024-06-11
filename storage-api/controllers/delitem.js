const init = require("../models/init-models");
const sequelize = require("../config/db");
const e = require("express");
var models = init(sequelize);
function ServerException(message) {
    this.message = message;
    this.name = "Служебная ошибка";
  }
exports.delete = async (req, res) => { //Удаление предмета
    try {
        if (req.headers.prodid != undefined)
            {
                const prodf = await models.product.findOne({
                    where: {
                        product_id: req.headers.prodid
                    }
                })
                if (!prodf) {
                    throw new ServerException("No item with this id found");
                }
                const product = await models.product.update({
                    product_in_warehouse: false
                }, {
                    where: {
                        product_id: prodf.product_id
                    },
                });
                if (product) {
                    res.status(200).json({message: "Success delete!"})
                }
            }
            else {
                throw new ServerException("Wrong or empty prodid")
            }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
      }
}