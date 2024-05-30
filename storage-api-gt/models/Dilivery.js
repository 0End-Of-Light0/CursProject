const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Dilivery', {
    diliveryid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    diliveryneeded: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    diliveryadress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    diliverytime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    diliverytypeid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'DiliveryType',
        key: 'diliverytypeid'
      }
    }
  }, {
    sequelize,
    tableName: 'Dilivery',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Dilivery__pk",
        unique: true,
        fields: [
          { name: "diliveryid" },
        ]
      },
    ]
  });
};
