/**
    Our Server
 **/

// BASE SETUP
// =============================================================================

// call the packages we need
var config = require('./config');
var express    = require('express');        // call express
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var app        = express();                 // define our app using express
var path = require('path');
const mongoose = require('mongoose');
var flash = require('connect-flash');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Passport SetUp
// =============================================================================

// SetUp MongoDB Connection for session storage
mongoose.connect(config.dbURI);

var passport = require('passport');
var expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
// TODO generate random secret string
app.use(expressSession({secret: 'mySecretKey', resave: true, saveUninitialized: true, cookie: { maxAge: config.sessionLength }, store: new MongoStore({ mongooseConnection: mongoose.connection })}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Initialize Passport
var initPassport = require('./lib/passport/init');
initPassport(passport);


// REGISTER OUR ROUTES -------------------------------
var router = require('./routes/api');
app.use('/api', router);
var routes = require('./routes/index')(passport);
app.use('/', routes);
var users = require('./routes/users');
app.use('/users', users);

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



// START THE SERVER
// =============================================================================
//console.log('Magic happens on port ' + port);
module.exports = app;