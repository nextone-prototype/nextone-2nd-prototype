/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var removeDocs = require('modelUtils').removeDocs;
var Comment = require('comment').model();
var Vote = require('vote').model();

var Product = new Schema({

    name : { type : String, required : 'Product name is required' },

    link : { type : String, required : 'Link is required' },

    description : String,

    date : { type : Date, default : Date.now },

    submitter : { type : Schema.Types.ObjectId, required : 'No submitter ID' },

    country : Schema.Types.ObjectId,

    category : Schema.Types.ObjectId
});

Product.post('remove', function (doc) {
    removeDocs(Comment, 'Comment', { product : doc._id });
    removeDocs(Vote, 'Vote', { entry : doc._id });
});

module.exports.model = function() {
    return mongoose.model('Product', Product);
};

