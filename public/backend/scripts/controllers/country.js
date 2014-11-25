/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appback')
    .controller('CountryCtrl', function ($scope, $http, $q, WebApi) {

    var COUNTRY_API = WebApi.countries;

    var REGION_API = WebApi.regions;

    $scope.regions = [];

    $scope.countries = [];

    $scope.loadErrorMsg = null;

    $scope.updateErrorMsg = null;

    var deletedItems = [];

    var initData = function(countries) {

        // Set region name to each country
        countries.forEach(function (c) {

            for (var i=0; i<$scope.regions.length; i++) {
                var r = $scope.regions[i];
                if (r._id === c.region) {
                    c.regionName = r.name;
                    break;
                }
            }
        });

        var sorted = countries.sort(function(a, b) {
            if (a.order < b.order) {
                return -1;
            } if (a.order > b.order) {
                return 1;
            } else {
                return 0;
            }
        });

        $scope.countries = sorted;

        $scope.loadErrorMsg = null;

        deletedItems = [];
    };

    var loadCountries = function() {
        $http.get(COUNTRY_API)
        .then(function(res) {
            initData(res.data);
        });
    };

    /**
     * Delete element at index from regions list
     * It doesn't update database.
     */
    $scope.delete = function(index) {

        deletedItems.push($scope.countries[index]);

        $scope.countries.splice(index, 1);
    };

    /**
     * Update database with current countries array.
     *
     */
    $scope.update = function() {

        var promises = [];

        for (var i = 0; i < $scope.countries.length; i++) {
            var putUrl = COUNTRY_API + '?_id=' + $scope.countries[i]._id;
            promises.push($http.put(putUrl, { order : i }));
        }
        for (var j = 0; j < deletedItems.length; j++) {
            var deleteUrl = COUNTRY_API + '?_id=' + deletedItems[j]._id;
            promises.push($http.delete(deleteUrl));
        }

        $q.all(promises)
        .then(function() {
            loadCountries();
        })
        .catch(function(err) {
            $scope.updateErrorMsg = err;
        });
    };

    $scope.undo = function() {

        loadCountries();
    };

    $http.get(REGION_API)
    .then(function (regions) {

        $scope.regions = regions.data;
        loadCountries();
    })
    .catch(function (data, status) {
        $scope.loadErrorMsg = data;
    });

});
