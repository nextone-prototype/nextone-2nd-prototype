/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({

    comment : { type: String, required: 'No comment body' },

    user : { type: Schema.Types.ObjectId, required: 'No posted user' },

    product : { type: Schema.Types.ObjectId, required: 'No product ID' },

    submitted : { type: Date, default: Date.now }

});

module.exports.model = function(){
    return mongoose.model('Comment', Comment);
};

