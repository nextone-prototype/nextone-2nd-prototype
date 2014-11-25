/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var launchParams = require('../utils/launchParams');

module.exports.load = function() {

    var dummyParams = {
        API_VERSION : 'v1',
        DB_DOMAIN : 'localhost',
        DB_NAME : 'nextoneut',
        LOG_LEVEL : 'DEBUG'
    };

    launchParams.load(dummyParams);

};
