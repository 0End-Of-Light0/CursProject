const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('specification', {
    specification_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    size_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'size',
        key: 'size_id'
      }
    },
    specification_weight: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    specification_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    specification_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'specification',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Specification__pk",
        unique: true,
        fields: [
          { name: "specification_id" },
        ]
      },
    ]
  });
};
