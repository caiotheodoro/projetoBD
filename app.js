var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');
var mongoose =  require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/enviarRedacao', function(req, res, next) {
  res.render('enviarRedacao', { title: 'Express' });
});
app.get('/redacoesCorrigidas', function(req, res, next) {
  res.render('redacoesCorrigidas', { title: 'Express' });
});

app.get('/areaProfessor', function(req, res, next) {
  res.render('areaProfessor', { title: 'Express' });
});
app.get('/painelProfessor', function(req, res, next) {
  res.render('painelProfessor', { title: 'Express' });
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
