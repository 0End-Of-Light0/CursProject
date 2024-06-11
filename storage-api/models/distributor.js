const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('distributor', {
    distributor_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    distributor_name: {
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
    tableName: 'distributor',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Distributor__pk",
        unique: true,
        fields: [
          { name: "distributor_id" },
        ]
      },
    ]
  });
};
