/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var logger = require('../../utils/log').logger;

module.exports = function(params) {

    return function (req, res) {

        var Model = params.model;

        var newData = new Model(req.body);

        var postFileParams = params.postFileParams;

        var postFolderName = params.postFolderName;

        if (req.query.redirect) {
            // ../ is to go up for api version.
            res.redirect('../' + req.query.redirect);
        }

        // Save posted files and fill those file path into newData
        if (postFileParams && 0 < postFileParams.length) {

            var PostedFileHandler = require('../postedFile');

            var path = require('path');
            var fileHandler = new PostedFileHandler(
                path.join(__dirname, '../../public/' + postFolderName));

            for (var i = 0; i<postFileParams.length; i++) {

                logger.debug(req.files[postFileParams[i]]);

                if (!fileHandler.isSupported(req, postFileParams[i])) {
                    res.send(400, 'Unsupported file type : ' + postFileParams[i]);
                    return;
                }

                // Save the file and add the file path into new data
                var fileName = fileHandler.savePostedFile(req, postFileParams[i]);

                if (fileName) {
                    newData[postFileParams[i]] = path.join(postFolderName, fileName);
                } else {
                    res.send(500, 'Failed to post file : ' + postFileParams[i]);
                    return;
                }
            }
        }

        // Save it into database
        var doSave = function() {
            newData.save(function (err, data) {

                if (err) {
                    logger.error('failed to save : ' + err);
                    res.send(500, err);
                } else {
                    res.send(200, data);
                }
            });
        };

        var save = function () {

            // When it requires to assign array index
            if (params.assignOrder) {

                Model.findOne().sort('-order').exec(function(err, item) {

                    if (!item) {
                        newData.order = 0;
                    } else {
                        newData.order = item.order + 1;
                    }
                    doSave();
                });

            } else {

                console.log('assignOrder is false');
                doSave();
            }
        };

        // Note : So far, this is only for vote.
        // メモ : 関数の引数でこういう関数をもらって、
        // saveの処理がnextみたいな形式にしてみる
        if (params.uniqueFieldComb && params.uniqueFieldComb.length) {

            var query = Model.find();
            params.uniqueFieldComb.forEach(function (field) {

                query.where(field).equals(newData[field]);
            });

            query.exec(function (err, data) {

                if (err) {

                    logger.error('failed to check unique combo : ' + err);
                    res.send(500, err);
                } else {

                    if (data && 0 < data.length) {
                        res.send(400, 'Cannot register duplicated date');
                    } else {
                        save();
                    }
                }
            });

        } else {

            save();
        }
    };
};
