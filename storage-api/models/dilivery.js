const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dilivery', {
    dilivery_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    dilivery_needed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dilivery_adress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dilivery_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dilivery_type_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'diliverytype',
        key: 'dilivery_type_id'
      }
    }
  }, {
    sequelize,
    tableName: 'dilivery',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Dilivery__pk",
        unique: true,
        fields: [
          { name: "dilivery_id" },
        ]
      },
    ]
  });
};
