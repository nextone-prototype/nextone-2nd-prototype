/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var express = require('express');

module.exports.create = function(params) {

    var router = express.Router();

    var handleGet = require('./getbase')(params);
    var handlePost = require('./postbase')(params);
    var handlePut = require('./putbase')(params);
    var handleDelete = require('./deletebase')(params);

    router
    .route(params.path)
    .get(handleGet)
    .post(handlePost)
    .put(handlePut)
    .delete(handleDelete);

    return router;
};
