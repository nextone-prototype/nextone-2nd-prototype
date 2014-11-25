/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .controller('UserinfoCtrl', function ($scope, $routeParams, UserUtils) {

        $scope.userId = $routeParams.user;

        UserUtils.getUserById($scope.userId).then(function (user) {
            $scope.user = user;
        });

    }
);
