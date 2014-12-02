/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var product = require('../../model/products');
var base = require('../crudbase/crudbase');
var logger = require('../../utils/log').logger;

var params = {

    path : '/',

    model : product.model(),

    getQueryParams : ['_id', 'submitter', 'country', 'category'],

    putQueryParams : ['_id'],

    deleteQueryParams : ['_id', 'submitter', 'country', 'category'],

    addExtraQueries : function (dist, queryParams) {
        // Parameter 'date' should be formatted by 'yyyyMMdd'
        if (queryParams.date) {
            var date = queryParams.date.match(/(\d{4})(\d{2})(\d{2})/);

            // Note : date[0] is original data (i.e. 20141101)
            var year = date[1];
            var month = parseInt(date[2]) - 1;
            var day = date[3];

            var start = new Date(year, month, day);
            var end = new Date(year, month, Number(day) + 1);

            dist.where('date').gte(start).lt(end);
        }

        // TODO : date From and To
        if (queryParams.dateFrom && queryParams.dateTo) {
            logger.warn('dateFrom and dateTo are not supported yet');
        }
    }
};

module.exports = base.create(params);
