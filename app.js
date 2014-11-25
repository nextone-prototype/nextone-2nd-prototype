/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// For enctype="multipart/form-data"
var multer = require('multer');

var apiFomatter = require('./routes/apiformat').format;

var app = express();

var launchParams = require('./utils/launchParams').load(process.env);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));

app.use(multer({ dest: './uploads/'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());
app.use(session({
    secret : launchParams.session.secret,
    // Followings are to remove warnings
    // http://stackoverflow.com/questions/24477035/express-4-0-express-session-with-odd-warning-message
    resave : true,
    saveUninitialized : true
}));

// Twitter authentication
require('./routes/authenticate/twitterOAuth').setRoute(app);

app.use(express.static(path.join(__dirname, 'public')));

// Routing for model access
app.use(apiFomatter('/comments'), require('./routes/data/comments'));
app.use(apiFomatter('/countries'), require('./routes/data/countries'));
app.use(apiFomatter('/regions'), require('./routes/data/regions'));
app.use(apiFomatter('/users'), require('./routes/data/users'));
app.use(apiFomatter('/products'), require('./routes/data/products'));
app.use(apiFomatter('/votes'), require('./routes/data/votes'));
app.use(apiFomatter('/follows'), require('./routes/data/follows'));

// Routing for views
app.get('/', function(req, res) {
    res.render('frontIndex.ejs', { title: 'nextone prototype' });
});

// Routing for admin page
require('./routes/adminAuth').setBasicAuth(app, '/admin');
app.get('/admin', function(req, res) {
    res.render('adminIndex.ejs', { title: 'nextone admin menu'});
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

var connect = require('./utils/dbconnection').connect;
connect();

module.exports = app;
