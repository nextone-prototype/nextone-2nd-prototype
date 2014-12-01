/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var follow = require('../../model/follow');
var base = require('./crudbase');

var params = {

    path : '/',

    model : follow.model(),

    getQueryParams : ['follower', 'followee'],

    deleteQueryParams : ['follower', 'followee'],

    uniqueFieldComb : ['follower', 'followee']

};

module.exports = base.create(params);
