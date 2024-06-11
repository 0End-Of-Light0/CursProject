const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_info_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'userinfo',
        key: 'user_info_id'
      }
    },
    authentication_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'authentication',
        key: 'authentication_id'
      }
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'position',
        key: 'position_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_User__pk",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
