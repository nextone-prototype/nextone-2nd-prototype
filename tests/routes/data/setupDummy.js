/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var launchParams = require('../utils/launchParams');
var dbConn = require('../utils/dbConnection');

module.exports.setupDb = function() {

    var dummyParams = {
        DB_URI : 'localhost',
        DB_NAME : 'nextoneut',
        LOG_LEVEL : 'DEBUG'
    };

    launchParams.load(dummyParams);

    dbConn.connect();
};


