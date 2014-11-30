/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var logger = require('../../utils/log').logger;

// Check if there's a data of
// specific data combination in tbe Model.
// E.g.)
// A data (xx, yy, zz) is registerd in the Model,
// then callback with error.
// The combination is stored in uniqueFieldComb.
module.exports.checkComb = function (target, fields, Model, callback) {

    // Make query to find
    var query = Model.find();

    fields.forEach(function (field) {

        query.where(field).equals(target[field]);
    });

    // Query to find the same combination
    query.exec(function (err, data) {

        if (err) {

            logger.error('failed to check unique combo : ' + err);
            callback(500, err);

        }
        else if (data && 0 < data.length) {

            callback(400, 'Cannot register duplicated date');
        }
        else {

            callback();
        }
    });
};
