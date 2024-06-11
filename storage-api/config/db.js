const Sequelize = require('sequelize');
module.exports = new Sequelize('project', 'postgres', '123451', { //Подключение к базе данных
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});