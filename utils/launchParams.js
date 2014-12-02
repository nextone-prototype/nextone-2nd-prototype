/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var logger = require('./log').logger;
var params = { };

module.exports.load = function(envParams) {

    var value = function(key) {
        if (!envParams[key]) {
            logger.info(key + ' is not in parameters');
        } else {
            logger.debug('launch params ' + key + ' : ' + envParams[key]);
        }
        return envParams[key];
    };

    /**
     * Database configs
     */
    params.db = {
        domain : value('DB_DOMAIN'),
        name : value('DB_NAME')
    };

    params.api = {
        version : value('API_VERSION')
    };

    params.adminAuth = {
        user : value('ADMIN_AUTH_USER'),
        password : value('ADMIN_AUTH_PASSWORD')
    };

    params.twitter = {
        consumer_key : value('TWITTER_CONSUMER_KEY'),
        consumer_secret : value('TWITTER_CONSUMER_SECRET')
    };

    params.session = {
        secret : value('SESSION_SECRET')
    };

    params.aws = {
        accesskey : value('AWS_ACCESS_KEY_ID'),
        secretkey : value('AWS_SECRET_KEY'),
        s3 : {
            databucket : value('DATA_BUCKET_NAME'),
            region : value('S3_REGION')
        }
    };

    /**
     * Log level, one of below.
     * TRACE, DEBUG, INFO, WARN, ERROR, FATAL
     */
    var logLevel = value('LOG_LEVEL');
    logger.setLevel(logLevel);
    logger.info('Log level : ' + logLevel);

    return params;
};

module.exports.params = function() {
    return params;
};
