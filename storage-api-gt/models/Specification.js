const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Specification', {
    specificationid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    sizeid: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Size',
        key: 'sizeid'
      }
    },
    specificationweight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    specificationcount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    specificationprice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Specification',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Specification__pk",
        unique: true,
        fields: [
          { name: "specificationid" },
        ]
      },
    ]
  });
};
