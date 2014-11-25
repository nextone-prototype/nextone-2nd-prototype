/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */

var mongoose = require('mongoose');
var logger = require('./log').logger;

var connection;

module.exports.connect = function() {

    var dbInfo = require('./launchParams').params().db;

    // e.g.)
    // To connect to myapp database in localhost,
    // mongodb://localhost/myapp
    var dbUri = 'mongodb://' + dbInfo.domain +'/' + dbInfo.name;

    logger.debug('DBUri : ' + dbUri);

    var connect = function () {

        var options = {
            server: { socketOptions: { keepAlive: 1 } }
        };

        connection = mongoose.connect(dbUri, options);
    };

    connect();

    mongoose.connection.on('error', console.log);
    mongoose.connection.on('disconnected', connect);
};

module.exports.disconnect = function() {
    mongoose.disconnect();
};

module.exports.connection = function() {
    return connection;
};
