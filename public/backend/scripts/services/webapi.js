/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appback')
    .service('WebApi', function Webapi() {

        function format(route) {
            return '/v1/' + route;
        }

        this.regions = format('regions');

        this.countries = format('countries');

    }
);


