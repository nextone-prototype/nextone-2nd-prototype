/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
  .directive('postform',
    function ($http, $location, UserSession, WebApi) {

    return {

        templateUrl: 'frontend/views/directives/postform.html',

        restrict: 'E',

        link: function(scope) {

            var userId = UserSession.getUserId();

            scope.name = null;

            scope.description = '';

            scope.link = null;

            scope.selectedCountry = null;

            scope.postErrMessage = null;

            $http.get(WebApi.countries)
            .then(function (res) {

                scope.countries = res.data;

                if (0 < scope.countries.length) {
                    scope.selectedCountry = scope.countries[0];
                }
            })
            .catch(function (err) {

                console.log('Failed to get countries : ' + err);
            });

            scope.submit = function () {

                var newProduct = {
                    name        : scope.name,
                    link        : scope.link,
                    description : scope.description,
                    submitter   : userId,
                    country     : scope.selectedCountry._id
                };

                $http.post(WebApi.products, newProduct)
                .success(function (data, status, headers, config) {

                    $location.path('/#/');
                })
                .error(function (data, status, headers, config) {

                    scope.postErrMessage = 'Failed to post : ' + status;
                });
            };

        }
    };
});
