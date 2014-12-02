/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// An entry of follow means that
// "The follower is following the followee"
var Follow = new Schema({

    follower : Schema.Types.ObjectId,

    followee : Schema.Types.ObjectId

});

mongoose.model('Follow', Follow);

module.exports.model = function () {
    return mongoose.model('Follow');
};
