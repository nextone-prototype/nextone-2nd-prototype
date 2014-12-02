/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var country = require('../../model/country');
var base = require('../crudbase/crudbase');

var params = {

    path : '/',

    model : country.model(),

    getQueryParams : ['_id', 'region'],

    postFileParams : ['flagImg'],

    postFolderName : 'images/countries',

    putQueryParams : ['_id'],

    deleteQueryParams : ['_id', 'region'],

    assignOrder : true

};

module.exports = base.create(params);
