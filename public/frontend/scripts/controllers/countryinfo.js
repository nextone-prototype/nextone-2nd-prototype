/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .controller('CountryinfoCtrl', function ($scope, $routeParams, $http, WebApi) {

        $scope.countryid = $routeParams.country;

        var apiUrl = WebApi.countries + '?_id=' + $scope.countryid;

        $http.get(apiUrl).then(function (res) {

            $scope.country = res.data[0];
        });

    }
);
