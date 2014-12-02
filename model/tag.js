/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tag = new Schema({
    name : String
});

mongoose.model('Tag', Tag);

module.exports.model = function () {
    return mongoose.model('Tag');
};
