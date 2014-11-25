/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .directive('navbar', function ($location, UserSession) {

    return {

        templateUrl: 'frontend/views/directives/navbar.html',

        restrict: 'E',

        link: function postLink(scope, element, attrs) {

            scope.logout = function () {

                UserSession.removeUserId();
                scope.userSession = null;

                $location.path('/#/');
            };

            scope.userSession = UserSession.getUserId();

        }
    };
});
