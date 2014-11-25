/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

// Load country information at its loading.
// Country info is basically static, so share them in app.
angular.module('appfront')
    .service('CountryUtils', function ($http, WebApi) {

        var countries = [];

        $http.get(WebApi.countries).then(function (res) {
            countries = res.data;
        });

        // Get URL of flag image file specified by id
        this.flagUrl = function (id) {

            for (var i = 0; i < countries.length; i++) {
                if (countries[i]._id === id) {
                    return countries[i].flagImg;
                }
            }
            return null;
        };

    }
);
