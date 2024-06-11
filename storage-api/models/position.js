const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('position', {
    position_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    position_name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'position',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Position__pk",
        unique: true,
        fields: [
          { name: "position_id" },
        ]
      },
    ]
  });
};
