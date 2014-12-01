/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var tag = require('../../model/tag');
var base = require('./crudbase');

var params = {

    path : '/',

    model : tag.model(),

    getQueryParams : ['_id'],

    putQueryParams : ['_id'],

    deleteQueryParams : ['_id']

};

module.exports = base.create(params);
