const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Distributor', {
    distributorid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    distributorname: {
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
    tableName: 'Distributor',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Distributor__pk",
        unique: true,
        fields: [
          { name: "distributorid" },
        ]
      },
    ]
  });
};
