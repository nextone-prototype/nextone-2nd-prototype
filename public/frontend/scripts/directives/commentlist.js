/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .directive('commentlist', function ($http, $q, WebApi, DateUtils, UserUtils) {

    return {

        templateUrl: 'frontend/views/directives/commentlist.html',

        restrict: 'E',

        // attrs must have 'product' value
        link: function postLink(scope, element, attrs) {

            scope.comments = [];

            var product = attrs.product;

            if (!product) {

                console.log('product attribute is mandatory for comment list');
                return;
            }

            var queryParams = '?product=' + product;

            $http.get(WebApi.comments + queryParams).then(function(res) {

                var comments = (200 === res.status) ? res.data : [];

                var promises = [];

                var makePromise = function (comment, userId) {

                    var deferred = $q.defer();

                    UserUtils.getUserById(comment.user).then(function(user) {

                        comment.user = user;
                        comment.displayDate = DateUtils.getDisplayDate(comment.submitted);

                        deferred.resolve();
                    });

                    return deferred.promise;
                };

                for (var i = 0; i < comments.length; i++) {
                    promises.push(makePromise(comments[i], comments.user));
                }

                // When all comments get displayable items,
                // comments are registerred to scope.
                $q.all(promises).then(function() {
                    scope.comments = comments;
                });

            });
        }
    };

});
