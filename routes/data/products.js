/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var product = require('../../model/products');
var base = require('./crudBase');

var params = {

    path : '/',

    model : product.model(),

    getQueryParams : ['_id', 'submitter', 'country', 'category'],

    putQueryParams : ['_id'],

    deleteQueryParams : ['_id', 'submitter', 'country', 'category']

};

module.exports = base.create(params);
