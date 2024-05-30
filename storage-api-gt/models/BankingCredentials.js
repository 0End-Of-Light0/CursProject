const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BankingCredentials', {
    bankingcredentialsid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    bankingcredentialsie: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    bankingcredentialskpp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bankingcredentialsinn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bankingcredentialsbic: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bankingcredentialskpo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bankingcredentialsogrn: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bankingcredentialsfax: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bankingcredentialsphone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bankingcredentialsbank: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BankingCredentials',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_BankingCredentials__pk",
        unique: true,
        fields: [
          { name: "bankingcredentialsid" },
        ]
      },
    ]
  });
};
