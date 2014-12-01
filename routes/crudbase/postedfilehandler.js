/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var logger = require('../../utils/log').logger;
var PostedFileHandler = require('./filesaverStorage').PostedFileHandler;

/*jshint -W079 */
var Promise = require('es6-promise').Promise;

/**
 * Returns promise instance to save posted files
 * to the specifiec folder in server side.
 *
 * "keys" param has field names where poseted files are stored.
 * So, posted files are specified by postedData[keys[i]],
 */
module.exports.handleFileFields = function (req, postedData, keys, folder) {

    var doHandle = function(resolve, reject) {

        var fileHandler = new PostedFileHandler();

        var path = require('path');

        var fullFolderPath = path.join(__dirname, '../../public/' + folder);

        var promises = [];

        // Make Promise to execute save
        // and store file path in postedData[key]
        var makeSaveProcedure = function (key) {
            return new Promise(function (resolve, reject) {

                // Node : Should update when storage is changed
                var save = fileHandler.saveToStorage;

                save(req, key, fullFolderPath)
                // save is OK
                .then(function (savedFile) {
                    postedData[key] = path.join(folder, savedFile.fileName);
                    resolve();
                })
                // Error happened in saving
                .catch(function (status, err) {
                    reject(status, err);
                });
            });
        };

        for (var i = 0; i < keys.length; i++) {
            promises.push(makeSaveProcedure(keys[i]));
        }

        Promise.all(promises)
        // All files are saved
        .then(function() {
            resolve(postedData);
        })
        // Error happens in saving file
        .catch(function(status, err) {
            logger.error('Error happened in handlePostedFiles : ' +
                status + ' - ' + err);
            reject(status, err);
        });

    };

    // true means that this model has some file fields
    if (keys && 0 < keys.length) {
        return new Promise(doHandle);
    }
    // this model doesn't have any file fields.
    else {
        return new Promise(function(resolve) {
            resolve(postedData);
        });
    }
};
