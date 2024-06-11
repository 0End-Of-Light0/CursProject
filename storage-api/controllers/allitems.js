const init = require("../models/init-models");
const sequelize = require("../config/db");
const e = require("express");
var models = init(sequelize);
function ServerException(message) { //Определение ошибки
  this.message = message;
  this.name = "Служебная ошибка";
}
exports.allitems = async (req, res) => { //Вывод списка всех продуктов
    try {
        const items = await models.product.findAll({ //Поиск всех товаров с условием, того что товар ещё есть на складе и присоединение всех таблиц по ключам хр. в продуктах
            include: [
              {
                model: models.type,
                as: 'type',
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
          if (items) { //Возврат всех товаров
            return res.status(200).json(items);
          }
          throw new ServerException("Unknown error");
    } 
    catch (error) {
        return res.status(500).json({ message: error.message }); //Возврат ошибок
      }
}