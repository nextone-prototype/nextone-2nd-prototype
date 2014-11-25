/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var dbConn = require('../utils/dbConnection');

module.exports.connect = function() {
    dbConn.connect();
};

module.exports.dropAndDisconnect = function() {
    dbConn.connection().connection.db.dropDatabase();
    dbConn.disconnect();
};

