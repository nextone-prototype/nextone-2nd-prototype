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

        var queryParams = params.getQueryParams;

        // Make query with its query paremeter configuration
        if (queryParams) {

            queryParams.forEach(function(key) {

                if (req.query[key]) {
                    query.where(key).equals(req.query[key]);
                }
            });
        }

        // ----- Reserved query parameters - from here ----- //
        if (req.query.limit) {

            query.limit(req.query.limit);
        }

        // Parameter 'date' should be formatted by 'yyyyMMdd'
        if (req.query.date) {
            var date = req.query.date.match(/(\d{4})(\d{2})(\d{2})/);

            // Note : date[0] is original data (i.e. 20141101)
            var year = date[1];
            var month = parseInt(date[2]) - 1;
            var day = date[3];

            var start = new Date(year, month, day);
            var end = new Date(year, month, Number(day) + 1);

            query.where('date').gte(start).lt(end);
        }

        // TODO : date From and To
        if (req.query.dateFrom && req.query.dateTo) {
            logger.warn('dateFrom and dateTo are not supported yet');
        }
        // ----- Reserved query parameters - to here ----- //

        // Execute query
        query.exec(function(err, data) {

            if (err) {
                logger.error('failed to find : ' + err);
                res.send(500, err);
            } else {
                res.send(200, data);
            }
        });
    };
};
