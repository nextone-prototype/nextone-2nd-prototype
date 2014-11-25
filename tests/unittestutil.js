/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var mongoose = require('mongoose');

module.exports.makeDummyObjectIds = function(num) {

    var ids = new Array(num);

    for (var i=0; i<num; i++) {
        ids[i] = new mongoose.Types.ObjectId();
    }

    return ids;
};

/**
 * Save test data to database.
 * It might take few seconds to complete save, this function makes sure
 * all data is stored in database.
 *
 */
module.exports.saveTestData = function(testdata, dbStoredData, model, done) {

    var saved = 0;

    var doSave = function(index) {
        new model(testdata[index]).save(function(err, data) {
            if (err) {
                done(err);
            } else {
                dbStoredData[index] = data;
                countSaved();
            }
        });
    };

    var countSaved = function() {
        saved++;
        if (saved === testdata.length) {
            done();
        }
    }

    for (var i=0; i < testdata.length; i++) {
        doSave(i);
    }
};

module.exports.verifyCount = function(model, expectedNum, callback) {

    var onCount = function(err, count) {
        if (err) {
            callback(err);
        } else {
            count.should.be.equal(expectedNum);
            callback();
        }
    };

    model.count(onCount);
};
