/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
  .directive('avatorbtn',
    function ($http, $location, UserSession, WebApi) {

    return {

        templateUrl: 'frontend/views/directives/avatorbtn.html',

        restrict: 'E',

        link: function(scope) {

            scope.userIcon = null;

            scope.logout = function () {

                UserSession.removeUserId();

                $location.path('/#/');
            };

            var userId = UserSession.getUserId();

            if (userId) {

                var getUserById = WebApi.users + '?_id=' + userId;

                $http.get(getUserById)
                .then(function (res) {

                    var user = res.data[0];

                    UserSession.setUserId(userId);

                    scope.userIcon = user.image;
                })
                .catch(function (err) {

                    console.log('Failed to get user info : ' + err);
                });
            }
        }
    };
});
