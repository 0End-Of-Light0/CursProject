const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('producthistory', {
    product_history_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    previous_adress_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'warehouse',
        key: 'warehouse_id'
      }
    },
    new_adress_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'warehouse',
        key: 'warehouse_id'
      }
    },
    product_history_transition_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'producthistory',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_UserHistory__pk",
        unique: true,
        fields: [
          { name: "product_history_id" },
        ]
      },
    ]
  });
};
