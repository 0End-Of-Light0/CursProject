const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Type', {
    typeid: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    typename: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_Type__pk",
        unique: true,
        fields: [
          { name: "typeid" },
        ]
      },
    ]
  });
};
