const init = require("../models/init-models");
const sequelize = require("../config/db");
const e = require("express");
const dilivery = require("../models/dilivery");
const client = require("../models/client");
var models = init(sequelize);
var product = {};
var orderl = {};
var order = {};
function ServerException(message) {
    this.message = message;
    this.name = "Служебная ошибка";
  }
exports.neworder = async (req, res) => { //Удаление предмета
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
        var dtype =  await models.diliverytype.findOne({
            dilivery_type_name: req.headers.dtname
        })
        if (!dtype || req.headers.dtname != undefined) {
            dtype =  await models.diliverytype.create({
                dilivery_type_name: req.headers.dtname
            })
        }
        if (!dtype) {
            throw new ServerException("Invalid or Missing dilivery type!");
        }
        if (dilivery_needed === false) {
            var dilivery = await models.dilivery.findOne({
                dilivery_needed: req.dilivery_needed
            })
        }
        else {  
            var dilivery = await models.dilivery.findOne({
                dilivery_needed: req.headers.dneeded,
                dilivery_adress: req.headers.dadress,
                dilivery_time: req.headers.dtime,
                dilivery_type_id: dtype.dilivery_type_id
            })
        }
        if (!dilivery && dilivery_needed === false) {
            dilivery = await models.dilivery.create({
                dilivery_needed: req.headers.dneeded,
            })
        }
        else if (dilivery_needed != undefined && dilivery_adress != undefined && dilivery_time != undefined) {
         dilivery = await models.dilivery.create({
            dilivery_needed: req.headers.dneeded,
            dilivery_adress: req.headers.dadress,
            dilivery_time: req.headers.dtime,
            dilivery_type_id: dtype.dilivery_type_id
        })
        }
        if (!dilivery) {
            throw new ServerException("Empty or Wrong dilivery params!");
        }
        var client = models.client.findOne({
            client_name: req.headers.cname
        })
        if (!client && client != undefined) {
            client = models.client.create({
                client_name: req.headers.cname
            })
        }
        if (!client) {
            throw new ServerException("Unknown or Empty client!");
        }
        if (order_description != undefined && order_time != undefined && order_total_price != undefined)
        {
            order = await models.order.create({
                order_description: req.headers.odescription,
                order_time: req.headers.otime,
                order_total_price: req.headers.ototalprice,
                client_id: client.client_id,
                dilivery_id: dilivery.dilivery_id,
                user_id: user.user_id
            })
        }
        else {
            throw new ServerException("Empty or Wrong order");
        }
        const prodids = req.headers.prodid.split(",")
        const ordercounts = req.headers.prodid.split(",")
        if (prodids.length === ordercounts.length) {
            for (let i = 0; prodids.length < i; i++) {
                product = models.product.findOne({
                    product_id: prodids[i]
                })
                if (!product) {
                    throw new ServerException("Wrong Product");
                }
            }
            
            for (let i = 0; prodids.length < i; i++) {
                product = models.product.findOne({
                    product_id: prodids[i]
                })
                orderl = models.orderedproducts.create({
                    order_id: order.order_id,
                    product_id: product.product_id,
                    ordered_products_count: ordercounts[i]
                })
            }
            res.status(200).json({message: "Succesful created order"})
        }
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}