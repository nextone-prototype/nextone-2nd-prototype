/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({

    // Twitter id (or, id of the SNS?)
    userId : { type: String, unique: true },

    accountPage : { type: String, unique: true },

    name : { type: String, required: 'No twitter name' },

    image : { type: String, required: 'No user icon' },

    created : { type : Date, default : Date.now },

    modified : { type : Date, default : Date.now }
});

module.exports.model = function() {
    return mongoose.model('User', User);
};
