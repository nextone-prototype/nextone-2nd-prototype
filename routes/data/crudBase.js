/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var express = require('express');

module.exports.create = function(params) {

    var router = express.Router();

    var handleGet = require('./crudBaseGet')(params);
    var handlePost = require('./crudBasePost')(params);
    var handlePut = require('./crudBasePut')(params);
    var handleDelete = require('./crudBaseDelete')(params);

    router
    .route(params.path)
    .get(handleGet)
    .post(handlePost)
    .put(handlePut)
    .delete(handleDelete);

    return router;
};
