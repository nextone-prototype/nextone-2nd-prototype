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

        var Model = params.model;

        var condition = {};

        var queryParams = params.deleteQueryParams;

        if (queryParams && 0 < queryParams.length) {

            queryParams.forEach(function(key) {

                if (req.query[key]) {
                    condition[key] = req.query[key];
                }
            });
        }

        // Doesn't allow to delete all data
        if (0 === Object.keys(condition).length) {

            var errMsg = 'Query parameter is necessary to delete';

            logger.error(errMsg);

            res.send(403, errMsg);
        }
        // Execute delete with condition
        else {

            Model.find(condition, function (err, docs) {

                var promises = [];

                var doRemove = function (doc) {

                    return function(resolve, reject) {

                        var onRemoved = function (err) {

                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        };

                        doc.remove(onRemoved);
                    };
                };

                for (var i=0; i < docs.length; i++) {

                    promises.push(new Promise(doRemove(docs[i])));
                }

                Promise.all(promises).then(function() {

                    res.send(204);
                })
                .catch(function(err) {

                    logger.error('failed to remove : ' + err);
                    res.send(500, err);
                });
            });
        }
    };
};
