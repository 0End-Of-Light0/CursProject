const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('warehouse', {
    warehouse_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    warehouse_adress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    warehouse_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    warehouse_section: {
      type: DataTypes.STRING,
      allowNull: true
    },
    warehouse_shelf: {
      type: DataTypes.STRING,
      allowNull: true
    },
    warehouse_cell: {
      type: DataTypes.STRING,
      allowNull: true
    },
    warehouse_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'warehouse',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_WarehouseAdress__pk",
        unique: true,
        fields: [
          { name: "warehouse_id" },
        ]
      },
    ]
  });
};
