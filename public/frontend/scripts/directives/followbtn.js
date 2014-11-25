/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .directive('followbtn', function ($http, WebApi, UserSession) {

    return {

        templateUrl: 'frontend/views/directives/followbtn.html',

        restrict: 'E',

        link: function postLink(scope, element, attrs) {

            scope.userSession = UserSession.getUserId();

            if (!scope.userSession) {
                return;
            }

            var follower = scope.userSession;

            var followee = attrs.target;

            if (follower === followee) {

                scope.isMySelf = true;

                return;
            }

            // Check if the user is following
            var checkFollowState = function () {

                var getFollowInfo = WebApi.follows +
                    '?follwer=' + follower + '&followee=' + followee;

                $http.get(getFollowInfo).then(function (res) {

                    scope.isFollowing = (0 < res.data.length) ? true : false;
                });
            };

            checkFollowState();


            scope.follow = function () {

                var newEntry = {
                    'follower' : follower,
                    'followee' : followee
                };

                $http.post(WebApi.follows, newEntry).then(function (res) {

                    checkFollowState();
                });
            };

            scope.unfollow = function () {

                var deleteFollowInfo = WebApi.follows +
                    '?follwer=' + follower + '&followee=' + followee;
                $http.delete(deleteFollowInfo).then(function (res) {

                    checkFollowState();
                });
            };
        }

    };
});
