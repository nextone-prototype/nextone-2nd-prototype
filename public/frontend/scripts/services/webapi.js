/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .service('WebApi', function Webapi() {

        function format(route) {

            return '/v1/' + route;
        }

        this.users = format('users');

        this.countries = format('countries');

        this.products = format('products');

        this.votes = format('votes');

        this.comments = format('comments');

        this.follows = format('follows');

        this.makeDateQuery = function (date) {

            var year = ('0000' + String(date.getFullYear())).slice(-4);

            var month = ('00' + String(date.getMonth() + 1)).slice(-2);

            var day = ('00' + String(date.getDate())).slice(-2);

            return year + month + day;
        };

    }
);
