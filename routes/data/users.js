/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var user = require('../../model/user');
var base = require('./crudbase');

var params = {

    path : '/',

    model : user.model(),

    getQueryParams : ['_id', 'tw_user_id'],

    putQueryParams : ['_id'],

    deleteQueryParams : ['_id']

};

module.exports = base.create(params);
