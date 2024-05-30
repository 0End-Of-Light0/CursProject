const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DiliveryType', {
    diliverytypeid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    diliverytypename: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DiliveryType',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_DiliveryType__pk",
        unique: true,
        fields: [
          { name: "diliverytypeid" },
        ]
      },
    ]
  });
};
