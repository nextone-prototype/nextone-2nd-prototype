/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Country = require('./country').model();
var removeDocs = require('modelUtils').removeDocs;
var logger = require('../utils/log').logger;

/*jshint -W079 */
var Promise = require('es6-promise').Promise;

var Region = new Schema({
    name : String,

    order : Number
});

Region.post('remove', function (doc) {
    removeDocs(Country, 'Country', { region : doc._id });
});

module.exports.model = function () {
    return mongoose.model('Region', Region);
};
