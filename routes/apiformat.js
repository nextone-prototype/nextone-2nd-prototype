/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var launchParams = require('../utils/launchParams').params();

module.exports.format = function(route) {

    var apiVer = launchParams.api.version;

    return '/' + apiVer + route;
};
