const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Position', {
    positionid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    positionname: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Position',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Position__pk",
        unique: true,
        fields: [
          { name: "positionid" },
        ]
      },
    ]
  });
};
