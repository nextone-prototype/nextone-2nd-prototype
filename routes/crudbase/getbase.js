/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
// Memo : How to query with date on mongoose
// http://bugrammer.g.hatena.ne.jp/nisemono_san/20120612/1339473306

'use strict';

var logger = require('../../utils/log').logger;

module.exports = function (params) {

    return function (req, res) {
        var query = params.model.find();

        // Make query with its query paremeter configuration
        if (params.getQueryParams) {
            params.getQueryParams.forEach(function(key) {
                if (req.query[key]) {
                    query.where(key).equals(req.query[key]);
                }
            });
        }

        // Add extra queries into query
        // This will be a specific value of the model
        if (params.addExtraQueries) {
            params.addExtraQueries(query, req.query);
        }

        // ----- Reserved query parameters - from here ----- //
        if (req.query.limit) {
            query.limit(req.query.limit);
        }
        // ----- Reserved query parameters - to here ----- //

        // Execute query
        query.exec(function(err, data) {
            if (!err) {
                res.send(200, data);
            } else {
                var errMsg = 'Failed to find : ' + err;
                logger.error(errMsg);
                res.send(500, errMsg);
            }
        });
    };
};
