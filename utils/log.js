/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
 'use strict';

var logger = require('log4js').getLogger();

module.exports.logger = logger;

module.exports.setLevel = function(level) {

    logger.setLevel(level);
};
