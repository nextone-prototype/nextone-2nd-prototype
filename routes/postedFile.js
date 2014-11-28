/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var logger = require('../utils/log').logger;

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

        var uploadedPath = req.files[key].path;
        var mimeType = req.files[key].mimetype;

        makeSureStoreFolder();

        var fileName = makeFileName(mimeType);
        var dist = path.join(storeFolder, fileName);

        try {
            fs.renameSync(uploadedPath, dist);
            logger.debug('Saved file to ' + dist);

            return fileName;
        } catch(err) {
            logger.error('Failed to handle posted image : ' + err);
            return null;
        }
    };

}

module.exports = PostedFileHandler;

