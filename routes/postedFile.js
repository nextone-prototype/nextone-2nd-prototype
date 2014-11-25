/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var logger = require('../utils/log').logger;
var s3Uploader = require('./s3FileWriter');

/*jshint -W079 */
var Promise = require('es6-promise').Promise;

function PostedFileHandler(storeFolder) {

    function makeSureStoreFolder() {

        try {
            fs.statSync(storeFolder);
        } catch (e) {
            logger.error(e);
            fs.mkdirSync(storeFolder, '0774');
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

    /**
     * Check if the file is supported or not.
     *
     * @param req Request objet of http
     * @param key Field name of req.files
     * @return true when it's supported
     */
    this.isSupported = function(req, key) {

        var mimeType = req.files[key].mimetype;

        if (mimeType && getExtension(mimeType)) {
            return true;
        } else {
            logger.warn('Unsuppoted file is posted');
            return false;
        }
    };

    /**
     * Save posted image to public folder.
     *
     * @param req Request objet of http
     * @param key Field name of req.files
     * @return File name (not path), null when error happens
     */
    this.savePostedFile = function(req, key) {

        if (!this.isSupported(req, key)) {
            return null;
        }

        return new Promise(function (resolve, reject) {
            var uploadedPath = req.files[key].path;
            var mimeType = req.files[key].mimetype;

            var fileName = makeFileName(mimeType);

            s3Uploader.upload(uploadedPath, 'flags', fileName)
            .then(function(data, err) {

                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    };

}

module.exports = PostedFileHandler;

