/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var mongoose = require('mongoose');
var fs = require('fs');
var Schema = mongoose.Schema;
var path = require('path');

var Country = new Schema({
    name : String,

    flagImg : String,

    region : Schema.Types.ObjectId,

    order : Number
});

// When a country doc is removed,
// flag image file also should be removed.
Country.post('remove', function (doc) {
    fs.unlinkSync(path.join(__dirname, '../public', doc.flagImg));
});

module.exports.model = function() {
    return mongoose.model('Country', Country);
};
