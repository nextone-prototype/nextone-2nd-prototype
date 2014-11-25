/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var vote = require('../../model/vote');
var base = require('./crudBase');

/**
 * Vote for product/comment/user...etc.
 * Call it as "entry".
 *
 */
var params = {

    path : '/',

    model : vote.model(),

    getQueryParams : ['_id', 'user', 'entry'],

    // E.g. Vote for productA by user01 wouldn't be accepted
    uniqueFieldComb : ['user', 'entry'],

    putQueryParams : ['_id'],

    deleteQueryParams : ['_id', 'user', 'entry']

};

module.exports = base.create(params);
