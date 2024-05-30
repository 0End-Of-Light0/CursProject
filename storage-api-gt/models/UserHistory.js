const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserHistory', {
    userhistoryid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'User',
        key: 'userid'
      }
    },
    productid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    previousadressid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Warehouse',
        key: 'warehouseid'
      }
    },
    newadressid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Warehouse',
        key: 'warehouseid'
      }
    },
    userhistorytransitiontime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'UserHistory',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_UserHistory__pk",
        unique: true,
        fields: [
          { name: "userhistoryid" },
        ]
      },
    ]
  });
};
