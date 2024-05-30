const Sequelize = require('sequelize');
module.exports = new Sequelize('project', 'postgres', 'test', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});