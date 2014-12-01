/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var comment = require('../../model/comment');
var base = require('./crudbase');

var params = {

    path : '/',

    model : comment.model(),

    getQueryParams : ['product', 'user'],

    putQueryParams : ['_id'],

    deleteQueryParams : ['_id', 'product']

};

module.exports = base.create(params);
