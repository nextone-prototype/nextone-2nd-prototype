/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vote = new Schema({
    entry : { type: Schema.Types.ObjectId },

    user : { type: Schema.Types.ObjectId },

    submitted : Date
});

mongoose.model('Vote', Vote);

module.exports.model = function() {
    return mongoose.model('Vote');
};
