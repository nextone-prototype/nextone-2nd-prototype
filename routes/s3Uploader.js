/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var AWS = require('aws-sdk');

var logger = require('../utils/log').logger;
var launchParams = require('../utils/launchParams').params();

/*jshint -W079 */
var Promise = require('es6-promise').Promise;

exports.upload = function (sourcePath, distFolderName, distFileName) {

    var writeFile = function (resole, reject) {

        AWS.config.update({
            accessKeyId : launchParams.aws.accesskey,
            secretAccessKey : launchParams.aws.secretkey,
            region : launchParams.aws.s3.region
        });

        var s3 = new AWS.S3();

        var params = {
            Bucket : launchParams.aws.s3.databucket,
            Key : distFolderName + distFileName,
            Body : fs.readFileSync(sourcePath),
            ACL : 'public-read'
        };

        var putFile = function () {
            s3.putObject(params, function (perr, pres) {

                if (perr) {
                    logger.error('Failed to upload to s3 ' + perr);
                    reject();
                } else {
                    resolve(makeS3FileUrl());
                }
            });
        };

        var makeS3FileUrl = function () {
            return 'https://s3-' + launchParams.aws.s3.region + '.amazonaws.com/' +
            launchParams.aws.s3.databucket + '/' + distFolderName '/' + distFileName;
        };

        s3.headBucket({ Bucket : distFolderName }, function (err, data) {

            if (!err) {
                putFile();
            }
            // When distFolder doesn't exist
            else {
                s3.createBucket( { Bucket : distFolderName }, function (err, data) {
                    putFile();
                });
            }
        });
    };

    return new Promise(writeFile);
};
