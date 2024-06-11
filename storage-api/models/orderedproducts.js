const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orderedproducts', {
    ordered_products_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'order',
        key: 'order_id'
      }
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'product',
        key: 'product_id'
      }
    },
    ordered_products_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orderedproducts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_OrderedProducts__pk",
        unique: true,
        fields: [
          { name: "ordered_products_id" },
        ]
      },
    ]
  });
};
