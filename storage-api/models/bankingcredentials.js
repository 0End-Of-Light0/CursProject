const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bankingcredentials', {
    banking_credentials_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    banking_credentials_ie: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    banking_credentials_kpp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    banking_credentials_inn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    banking_credentials_bic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    banking_credentials_kpo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    banking_credentials_ogrn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    banking_credentials_fax: {
      type: DataTypes.STRING,
      allowNull: true
    },
    banking_credentials_phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    banking_credentials_bank: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bankingcredentials',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_BankingCredentials__pk",
        unique: true,
        fields: [
          { name: "banking_credentials_id" },
        ]
      },
    ]
  });
};
