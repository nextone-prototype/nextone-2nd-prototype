/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var region = require('../../model/region');
var base = require('./crudBase');

var params = {

    path : '/',

    model : region.model(),

    getQueryParams : ['_id'],

    putQueryParams : ['_id'],

    deleteQueryParams : ['_id'],

    assignOrder : true

};

module.exports = base.create(params);
