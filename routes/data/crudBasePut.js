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

        // Make condition to update from query parameters
        var condition = { };

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

                return function(resolve, reject) {

                    var onUpdate = function (err) {

                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    };

                    doc.update(req.body, onUpdate);
                };
            };

            for (var i=0; i < docs.length; i++) {

                promises.push(new Promise(docs[i]));
            }

            if (0 === promises.length) {

                logger.warn('No raw was updated');
                res.send(500, 'No raw was updated');
            } else {

                Promise.all(promises).then(function() {
                    res.send(200);
                })
                .catch(function(err) {
                    logger.error('failed to remove : ' + err);
                    res.send(500, err);
                });
            }
        });
    };
};
