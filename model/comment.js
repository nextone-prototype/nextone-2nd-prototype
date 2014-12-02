/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var removeDocs = require('./modelUtils').removeDocs;
var Vote = require('./vote').model();

var Comment = new Schema({
    comment : { type: String, required: 'No comment body' },

    user : { type: Schema.Types.ObjectId, required: 'No posted user' },

    product : { type: Schema.Types.ObjectId, required: 'No product ID' },

    submitted : { type: Date, default: Date.now }
});

Comment.post('remove', function (doc) {
    removeDocs(Vote, 'Vote', { entry : doc._id });
});

mongoose.model('Comment', Comment);

module.exports.model = function () {
    return mongoose.model('Comment');
};
