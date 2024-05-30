const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Product', {
    productid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    warehouseid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Warehouse',
        key: 'warehouseid'
      }
    },
    typeid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Type',
        key: 'typeid'
      }
    },
    distributorid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Distributor',
        key: 'distributorid'
      }
    },
    specificationid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Specification',
        key: 'specificationid'
      }
    },
    productname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    productarrival: {
      type: DataTypes.DATE,
      allowNull: true
    },
    productinwarehouse: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Product__pk",
        unique: true,
        fields: [
          { name: "productid" },
        ]
      },
    ]
  });
};
