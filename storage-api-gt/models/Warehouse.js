const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Warehouse', {
    warehouseid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    warehouseadressadress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    warehousenumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    warehousesection: {
      type: DataTypes.STRING,
      allowNull: true
    },
    warehouseshelf: {
      type: DataTypes.STRING,
      allowNull: true
    },
    warehousecell: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Warehouse',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_WarehouseAdress__pk",
        unique: true,
        fields: [
          { name: "warehouseid" },
        ]
      },
    ]
  });
};
