/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .directive('followinfo', function ($http, $q, WebApi, UserUtils) {

    return {

        templateUrl: 'frontend/views/directives/followinfo.html',

        restrict: 'E',

        scope: true,

        link: function postLink(scope, element, attrs) {

            var queryParams = '?';

            // To list users whom user XXX is following.
            if ('followings' in attrs) {

                scope.followings = true;
                queryParams += 'follower=' + attrs.followings;
            }
            // To list users whom are followed by XXX.
            else if ('followedby' in attrs) {

                scope.followedby = true;
                queryParams += 'followee=' + attrs.followedby;
            }

            var loadFollows = function () {

                $http.get(WebApi.follows + queryParams).then(function(res) {

                    var follows = res.data;

                    var promises = [];

                    var loadedInfo = [];

                    var onUserLoaded = function(user) {

                        loadedInfo.push(user);
                    };

                    for (var i=0; i < follows.length; i++) {

                        var targetId;

                        if (scope.followings) {

                            targetId = follows[i].followee;
                        }
                        else if (scope.followedby) {

                            targetId = follows[i].follower;
                        }

                        var p = UserUtils.getUserById(targetId).then(onUserLoaded);

                        promises.push(p);
                    }

                    $q.all(promises).then(function() {

                        scope.loaded = loadedInfo;
                    });
                });
            };

            // isFollowing is updated by followbtn directive
            scope.$watch('isFollowing', function () {
                loadFollows();
            });

            loadFollows();
        }
    };
});
