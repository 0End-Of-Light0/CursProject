const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Client', {
    clientid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    clientname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bankingcredentialsid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'BankingCredentials',
        key: 'bankingcredentialsid'
      }
    }
  }, {
    sequelize,
    tableName: 'Client',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Client__pk",
        unique: true,
        fields: [
          { name: "clientid" },
        ]
      },
    ]
  });
};
