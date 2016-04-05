var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbUrl = require('./config/db.js').url;
// authentication packages
var session = require('express-session');
var passport = require('passport');
// var User = require('./models/user');
var Account = require('./models/account');

// page routes
var routes = require('./routes/index');
var directory = require('./routes/directory');
var auth = require('./routes/auth');
var masterDirectory = require('./routes/master-directory');
var app = express();

// passport config stuff
app.use(session({
  secret: 'DmitriFyodorovichKaramazov',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// use account model
// passport.use(Account.createStrategy());
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// read database connection srting from the config file
mongoose.connect(dbUrl);

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

// enable flash for showing messages
// app.use(flash());

// map requests to their appropriate pages
app.use('/', routes);
// app.use('/users', users);
app.use('/directory', directory);
app.use('/master-directory', masterDirectory);
app.use('/auth', auth);


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