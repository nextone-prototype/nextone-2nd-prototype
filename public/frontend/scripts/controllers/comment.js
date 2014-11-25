/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .controller('CommentCtrl', function ($scope, $routeParams) {

        $scope.product = $routeParams.product;

    }
);
