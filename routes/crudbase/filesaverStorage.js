/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var logger = require('../../utils/log').logger;

/*jshint -W079 */
var Promise = require('es6-promise').Promise;

/**
 * It handles file information from request instance.
 *
 */
module.exports.PostedFileHandler = function () {

    function makeSureFolder(folder) {

        try {
            fs.statSync(folder);
        } catch (e) {
            logger.error(e);
            fs.mkdirSync(folder, '0774');
        }
    }

    function getExtension(mimeType) {

        if (mimeType === 'image/gif') {
            return '.gif';
        }
        else if (mimeType === 'image/jpeg') {
            return '.jpg';
        }
        else if (mimeType === 'image/png') {
            return '.png';
        }

        logger.warn('Unsupported type : ' + mimeType);

        return null;
    }

    function makeFileName(mimeType) {

        var date = new Date();
        var createdDate = date.getTime();

        return createdDate + getExtension(mimeType);
    }

    // Check if the file is supported or not.
    function isSupported (req, key) {

        var mimeType = req.files[key].mimetype;

        if (mimeType && getExtension(mimeType)) {
            return true;
        } else {
            logger.warn('Unsuppoted file is posted');
            return false;
        }
    }

    /**
     * Returns promise instance to execute save file in request.
     *
     * The file is pulled from request and saved into distFolder.
     *
     */
    this.saveToStorage = function(req, key, distFolder) {

        var uploadedPath = req.files[key].path;

        var mimeType = req.files[key].mimetype;

        return new Promise(function (resolve, reject) {

            if (!isSupported(req, key)) {
                reject(400, 'Unsupported file type : ' + key);
                return;
            }

            makeSureFolder(distFolder);

            var fileName = makeFileName(mimeType);
            var dist = path.join(distFolder, fileName);

            // When save is success, it returns fileName
            fs.rename(uploadedPath, dist, function (err) {
                if (!err) {
                    // dist is full path where the file is saved,
                    // fileName is just file name careted in this method
                    resolve({ fullPath : dist, fileName : fileName });
                } else {
                    reject(500, 'Failed to handle posted image : ' + err);
                }
            });
        });
    };
};
