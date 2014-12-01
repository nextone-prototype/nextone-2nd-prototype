/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var logger = require('../../utils/log').logger;

/*jshint -W079 */
var Promise = require('es6-promise').Promise;

module.exports = function (params) {

    return function (req, res) {

        var condition = { };

        // Make condition to update from query parameters
        var queryParams = params.putQueryParams;
        if (queryParams && 0 < queryParams.length) {
            queryParams.forEach(function(key) {
                if (req.query[key]) {
                    condition[key] = req.query[key];
                }
            });
        } else {
            var errMsg = 'Query parameter is necessary';
            logger.error(errMsg);
            res.send(403, errMsg);
        }

        params.model.find(condition, function (err, docs) {
            var promises = [];

            var doUpdate = function (doc) {
                return new Promise(function(resolve, reject) {
                    doc.update(req.body, function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            };

            for (var i=0; i < docs.length; i++) {
                promises.push(doUpdate(docs[i]));
            }

            if (0 === promises.length) {
                logger.warn('In crudBasePut, no raw was updated');
                res.send(500, 'No raw was updated at Put method');
            } else {
                Promise.all(promises).then(function() {
                    res.send(200);
                }).catch(function(err) {
                    var errMsg = 'Failed to update : ' + err;
                    logger.error(errMsg);
                    res.send(500, errMsg);
                });
            }
        });
    };
};
