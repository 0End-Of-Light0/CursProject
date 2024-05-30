const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserInfo', {
    userinfoid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    userinfoname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userinfosurname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userinfopatronymic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userinfophone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userinfoemail: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'UserInfo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_UserInfo__pk",
        unique: true,
        fields: [
          { name: "userinfoid" },
        ]
      },
    ]
  });
};
