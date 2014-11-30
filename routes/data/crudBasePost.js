/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var logger = require('../../utils/log').logger;

/*jshint -W079 */
var Promise = require('es6-promise').Promise;

module.exports = function(params) {

    var checkUniqueFields = function (postedData, uniqueFieldComb, model) {

        var doCheckUniqueFields = function (resolve, reject) {

            if (uniqueFieldComb && uniqueFieldComb.length) {

                var checkCombo = require('./crudBasePostCombCheck').checkCombo;

                checkCombo(uniqueFieldComb, model, function(statusCode, err) {

                    if (!err) {
                        resolve(postedData);
                    } else {
                        reject(statusCode, err);
                    }
                });

            } else {

                resolve(postedData);
            }
        };

        return new Promise(doCheckUniqueFields);
    };

    return function (req, res) {

        var Model = params.model;

        // ../ is to go up for api version.
        if (req.query.redirect) {
            res.redirect('../' + req.query.redirect);
        }

        var fileKeys = params.postFileParams;
        var folder = params.postFolderName;
        var handleFileFileds = require('./crudBasePostFileHandler').handleFileFields;

        // Model is passed through promises as 'data' param
        handleFileFileds(
            req, new Model(req.body), fileKeys, folder)
        // Check if duplicated entry is registerd
        .then(function(data) {

            var uniqueFieldComb = params.uniqueFieldComb;
            return checkUniqueFields(data, uniqueFieldComb, Model);
        })
        // At the last, save the new data
        .then(function (data) {

            var onSaved = function (err) {
                if (err) {
                    res.send(500, err);
                } else {
                    res.send(200, data);
                }
            };

            // When it requires to assign array index
            if (params.assignOrder) {
                Model.findOne().sort('-order').exec(function(err, item) {
                    if (!item) {
                        data.order = 0;
                    } else {
                        data.order = item.order + 1;
                    }
                    data.save(onSaved);
                });
            } else {
                data.save(onSaved);
            }
        })
        // Error happens in promise execution
        .catch(function(statusCode, err) {
            logger.error('Error happened in crudBasePost : ' + statusCode + ' - ' + err);
            res.send(statusCode, err);
        });

    };
};
