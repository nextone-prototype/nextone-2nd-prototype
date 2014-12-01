/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var vote = require('../../model/vote');
var base = require('./crudbase');
var logger = require('../../utils/log').logger;

/*jshint -W079 */
var Promise = require('es6-promise').Promise;

/**
 * Vote for product/comment/user...etc.
 * Call it as "entry".
 */
var params = {

    path : '/',

    model : vote.model(),

    getQueryParams : ['_id', 'user', 'entry'],

    putQueryParams : ['_id'],

    deleteQueryParams : ['_id', 'user', 'entry'],

    checkPostedData : function (postedData, Model) {
        return new Promise(function (resolve, reject){
            var query = Model.find();

            // Check if there's an entry having same user and entry
            query.where('user').equals(postedData.user);
            query.where('entry').equals(postedData.entry);

            query.exec(function (err, data) {
                // Internal error happnes at query
                if (err) {
                    var msg = 'Failed to check postedDataCheck in vote : ' + err;
                    logger.error(msg);
                    reject(500, msg);
                }
                // Duplicated data is found
                else if (data && 0 < data.length) {
                    reject(400, 'The user has already voted to the entry');
                }
                // Not find duplicated data
                else {
                    resolve(postedData);
                }
            });
        });
    }
};

module.exports = base.create(params);
