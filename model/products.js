/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({

    name : { type : String, required : 'Product name is required' },

    link : { type : String, required : 'Link is required' },

    description : String,

    date : { type : Date, default : Date.now },

    submitter : { type : Schema.Types.ObjectId, required : 'No submitter ID' },

    country : Schema.Types.ObjectId,

    category : Schema.Types.ObjectId
});

module.exports.model = function() {
    return mongoose.model('Product', Product);
};

