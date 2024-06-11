const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('type', {
    type_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Type__pk",
        unique: true,
        fields: [
          { name: "type_id" },
        ]
      },
    ]
  });
};
