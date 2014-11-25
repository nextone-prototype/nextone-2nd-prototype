/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var basicAuth = require('basic-auth-connect');

module.exports.setBasicAuth = function(app, path) {

    var launchParams = require('../utils/launchParams').params();

    app.all(path, basicAuth(function(user, password) {
        return (user === launchParams.adminAuth.user &&
            password === launchParams.adminAuth.password);
    }));
};
