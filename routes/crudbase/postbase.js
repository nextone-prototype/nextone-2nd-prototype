/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var logger = require('../../utils/log').logger;

/*jshint -W079 */
var Promise = require('es6-promise').Promise;

module.exports = function(params) {

    return function (req, res) {

        var Model = params.model;

        // ../ is to go up for api version.
        if (req.query.redirect) {
            res.redirect('../' + req.query.redirect);
        }

        var fileKeys = params.postFileParams;
        var folder = params.postFolderName;

        var handleFileFileds = require('./postedfilehandler').handleFileFields;

        // Model is passed through promises as 'data' param
        handleFileFileds(req, new Model(req.body), fileKeys, folder)

        // Check the posted data if needed
        .then(function(data) {
            if (params.checkPostedData) {
                return params.checkPostedData(data, Model);
            } else {
                // Nothing to do when no check is needed
                return new Promise(function(resolve) {
                    resolve(data);
                });
            }
        })

        // At the last, save the new data
        .then(function (data) {
            var onSaved = function (err) {
                if (err) {
                    logger.error('Failed to save in post : ' + err);
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
