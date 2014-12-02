/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var removeDocs = require('./modelUtils').removeDocs;

var Vote = require('./vote').model();
var Comment = require('./comment').model();
var Follow = require('./follow').model();

var User = new Schema({
    // Twitter id (or, id of the SNS?)
    userId : { type: String, unique: true },

    accountPage : { type: String, unique: true },

    name : { type: String, required: 'No twitter name' },

    image : { type: String, required: 'No user icon' },

    created : { type : Date, default : Date.now },

    modified : { type : Date, default : Date.now }
});

User.post('remove', function (doc) {
    removeDocs(Vote, 'Vote', { user : doc._id });
    removeDocs(Comment, 'Comment', { user : doc._id });
    removeDocs(Follow, 'Follow', { follower : doc._id });
    removeDocs(Follow, 'Follow', { followee : doc._id });
});

mongoose.model('User', User);

module.exports.model = function () {
    return mongoose.model('User');
};
