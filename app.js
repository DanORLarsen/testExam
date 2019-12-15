var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require('./dbTool')

var indexRouter = require('./routes/index');
var devicesRouter = require('./routes/devices');
var apiRouter = require('./routes/api');
var createRouter = require('./routes/create');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

database.setupDatabase();
database.setupTables();
database.createSimpleData(1, 1337, '1.0', 'Leet bulp', 100, "Red", true);
database.createSimpleData(2, 420, '1.0', 'Calm bulp', 100, "Green", true);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/devices', devicesRouter);
app.use('/api', apiRouter);
app.use('/create', createRouter);

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
