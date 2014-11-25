/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .controller('ProductCtrl',
        function ($scope, $routeParams, $http, WebApi, UserUtils, DateUtils) {

        $scope.productId = $routeParams.product;

        var productApi = WebApi.products + '?_id=' + $scope.productId;

        // Load the detail of this product
        $http.get(productApi).then(function (res) {

            $scope.product = res.data[0];

            UserUtils.getUserById($scope.product.submitter)
            .then(function (submitter) {

                $scope.submitter = submitter;
            });

        });

        $scope.formatDate = function (isoDate) {
            return DateUtils.getDisplayDate(isoDate);
        };
    }
);


