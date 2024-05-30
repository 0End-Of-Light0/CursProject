const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderedProducts', {
    orderedproductsid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    orderid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Order',
        key: 'orderid'
      }
    },
    productid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Product',
        key: 'productid'
      }
    },
    orderedproductscount: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'OrderedProducts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_OrderedProducts__pk",
        unique: true,
        fields: [
          { name: "orderedproductsid" },
        ]
      },
    ]
  });
};
