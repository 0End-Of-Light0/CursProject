const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    product_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    warehouse_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'warehouse',
        key: 'warehouse_id'
      }
    },
    type_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'type',
        key: 'type_id'
      }
    },
    distributor_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'distributor',
        key: 'distributor_id'
      }
    },
    specification_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'specification',
        key: 'specification_id'
      }
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    product_arrival: {
      type: DataTypes.DATE,
      allowNull: true
    },
    product_in_warehouse: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    product_description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Product__pk",
        unique: true,
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
