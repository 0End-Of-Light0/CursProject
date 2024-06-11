const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('diliverytype', {
    dilivery_type_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    dilivery_type_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'diliverytype',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_DiliveryType__pk",
        unique: true,
        fields: [
          { name: "dilivery_type_id" },
        ]
      },
    ]
  });
};
