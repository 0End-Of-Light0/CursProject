const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('size', {
    size_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    size_length: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    size_width: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    size_height: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'size',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Size__pk",
        unique: true,
        fields: [
          { name: "size_id" },
        ]
      },
    ]
  });
};
