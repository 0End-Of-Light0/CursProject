const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authentication', {
    authentication_id: {
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
    tableName: 'authentication',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "authentication_pk",
        unique: true,
        fields: [
          { name: "authentication_id" },
        ]
      },
    ]
  });
};
