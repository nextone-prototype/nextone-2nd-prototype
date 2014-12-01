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

module.exports.model = function() {
    return mongoose.model('Tag', Tag);
};
