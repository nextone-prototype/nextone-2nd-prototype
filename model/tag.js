/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tag = new Schema({

    name : String

});

module.exports.model = function() {
    return mongoose.model('Tag', Tag);
};
