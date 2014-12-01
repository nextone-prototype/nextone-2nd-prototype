/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var logger = require('../utils/log').logger;

/**
 * Remove documents which are found in the mobel by query.
 */
module.exports.removeDocs = function (model, modelName, query) {
    model.find(query, function (err, docs) {
        var promises = [];

        var doRemove = function (doc) {
            return new Promise(function(resolve, reject) {
                doc.remove(function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        };

        for (var i=0; i < docs.length; i++) {
            promises.push(doRemove(docs[i]));
        }

        Promise.all(promises).then(function() {
            logger.debug('OK to remove ' + modelName + ' after remove user');
        })
        .catch(function(err) {
            logger.error('Failed to remove : ' + err);
        });
    });
};
