const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Authentication', {
    authenticationid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Authentication',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "authentication_pk",
        unique: true,
        fields: [
          { name: "authenticationid" },
        ]
      },
    ]
  });
};
