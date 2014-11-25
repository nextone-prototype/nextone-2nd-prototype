/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .directive('usericon', function ($location, UserUtils) {

    return {

        templateUrl: 'frontend/views/directives/usericon.html',

        restrict: 'E',

        link: function postLink(scope, element, attrs) {

            scope.size = attrs.size;

            UserUtils.getUserById(attrs.user).then(function (user) {

                scope.user = user;
            });

        }
    };
});
