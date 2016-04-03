var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// add mongoose
var mongoose = require('mongoose');

// page routes
var routes = require('./routes/index');
var users = require('./routes/users');
var directory = require('./routes/directory');
var masterDirectory = require('./routes/master-directory');
var app = express();

// read database connection srting from the config file
var configDb = require('./config/db.js');
mongoose.connect(configDb.url);

// database connection
var db = mongoose.connection;

// if we get an error message, show it in the console
db.on('error', console.error.bind(console, 'DB Error: '));

// if our connection is open, send a success message to the console
db.once('open', function(callback) {
  console.log('Connected to mongodb');
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// map requests to their appropriate pages
app.use('/', routes);
app.use('/users', users);
app.use('/directory', directory);
app.use('/master-directory', masterDirectory);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
