/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appback')
    .controller('RegionCtrl', function ($scope, $http, $q, WebApi) {

    var REGION_API = WebApi.regions;

    var deletedItems = [];

    var loadRegions = function() {

        $http.get(REGION_API).then(function (res) {
            initData(res.data);
        });
    };

    $scope.regions = [];

    /**
     * Delete element at index from regions list
     * It doesn't update database.
     */
    $scope.delete = function(index) {

        deletedItems.push($scope.regions[index]);

        $scope.regions.splice(index, 1);
    };

    /**
     * Update database with current regions array.
     *
     */
    $scope.update = function() {

        var promises = [];

        for (var i=0; i < $scope.regions.length; i++) {
            var putUrl = REGION_API + '?_id=' + $scope.regions[i]._id;
            promises.push($http.put(putUrl, { order : i }));
        }
        for (var j=0; j < deletedItems.length; j++) {
            var deleteUrl = REGION_API + '?_id=' + deletedItems[j]._id;
            promises.push($http.delete(deleteUrl));
        }

        $q.all(promises)
        .then(function() {
            loadRegions();
        })
        .catch(function(err) {
            console.log(err);
        });
    };

    $scope.undo = function() {
        loadRegions();
    };

    var initData = function(data) {

        var sorted = data.sort(function(a, b) {
            if (a.order < b.order) {
                return -1;
            } if (a.order > b.order) {
                return 1;
            } else {
                return 0;
            }
        });

        $scope.regions = sorted;

        deletedItems = [];
    };

    loadRegions();

});
