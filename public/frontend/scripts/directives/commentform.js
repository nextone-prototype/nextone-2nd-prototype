/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .directive('commentform', function ($http, UserSession, WebApi, $location) {

    return {

        templateUrl: 'frontend/views/directives/commentform.html',

        restrict: 'E',

        // attrs must have 'user' & 'product'
        link: function postLink(scope, element, attrs) {

            var user = UserSession.getUserId();

            var product = attrs.product;

            if (!product) {

                console.log('Error : Product are necessary to post comment');
                return;
            }

            scope.comment = '';

            scope.postErrMessage = null;

            scope.submit = function () {

                var newComment = {
                    comment : scope.comment,
                    user    : user,
                    product : product
                };

                $http.post(WebApi.comments, newComment)
                .success(function (data, status, headers, config) {

                    $location.path('/');
                })
                .error(function (data, status, headers, config) {

                    scope.postErrMessage = 'Failed to post : ' + status;
                });
            };
        }
    };
});
