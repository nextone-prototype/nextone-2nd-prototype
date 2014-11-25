/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Country = require('./country').model();

/*jshint -W079 */
var Promise = require('es6-promise').Promise;

var logger = require('../utils/log').logger;

var Region = new Schema({

    name : String,

    order : Number

});

Region.post('remove', function (doc) {

    Country.find({ region : doc._id }, function (err, docs) {

        var promises = [];

        var doRemove = function (doc) {

            return function(resolve, reject) {

                docs.remove(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            };
        };

        for (var i=0; i < docs.length; i++) {

            promises.push(new Promise(doRemove(docs[i])));
        }

        Promise.all(promises).then(function() {
            logger.debug('Countries are also removed for region : ' + doc.name);
        })
        .catch(function(err) {
            logger.error('failed to remove : ' + err);
        });
    });
});


module.exports.model = function () {
    return mongoose.model('Region', Region);
};
