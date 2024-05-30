const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Size', {
    sizeid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    sizelength: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sizewidth: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sizeheight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Size',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Size__pk",
        unique: true,
        fields: [
          { name: "sizeid" },
        ]
      },
    ]
  });
};
