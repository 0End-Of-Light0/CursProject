const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    order_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    order_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    order_total_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    client_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'client',
        key: 'client_id'
      }
    },
    dilivery_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'dilivery',
        key: 'dilivery_id'
      }
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'order',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Order__pk",
        unique: true,
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
};
