var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Sequelize = require('sequelize');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
const config = require("./config/secretkey");
var cookieSession = require("cookie-session");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('trust proxy', 1)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cookieSession({
    name: 'session',
    keys: [config.secret], // should use as secret environment variable
    httpOnly: true,
  })
);
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.set('Content-Type', 'application/json');

  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(apiRouter);

const sequelize = new Sequelize('project', 'postgres', 'test', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
