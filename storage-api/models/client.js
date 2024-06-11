const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('client', {
    client_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    client_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    banking_credentials_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'bankingcredentials',
        key: 'banking_credentials_id'
      }
    }
  }, {
    sequelize,
    tableName: 'client',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Client__pk",
        unique: true,
        fields: [
          { name: "client_id" },
        ]
      },
    ]
  });
};
