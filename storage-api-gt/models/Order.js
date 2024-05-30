const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order', {
    orderid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    orderdescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ordertime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ordertotalprice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    clientid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Client',
        key: 'clientid'
      }
    },
    diliveryid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Dilivery',
        key: 'diliveryid'
      }
    }
  }, {
    sequelize,
    tableName: 'Order',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Order__pk",
        unique: true,
        fields: [
          { name: "orderid" },
        ]
      },
    ]
  });
};
