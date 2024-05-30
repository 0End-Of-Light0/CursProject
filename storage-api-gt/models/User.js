const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    userid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    userinfoid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'UserInfo',
        key: 'userinfoid'
      }
    },
    authenticationid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Authentication',
        key: 'authenticationid'
      }
    },
    positionid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Position',
        key: 'positionid'
      }
    }
  }, {
    sequelize,
    tableName: 'User',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_User__pk",
        unique: true,
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
