const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userinfo', {
    user_info_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_info_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_info_surname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_info_patronymic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_info_phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_info_email: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'userinfo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_UserInfo__pk",
        unique: true,
        fields: [
          { name: "user_info_id" },
        ]
      },
    ]
  });
};
