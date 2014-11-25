/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .directive('productlist',
        function ($http, $location, WebApi, UserSession, CountryUtils, DateUtils, UserUtils) {

    return {

        templateUrl: 'frontend/views/directives/productlist.html',

        restrict: 'E',

        link: function postLink(scope, element, attrs) {

            scope.countryUtils = CountryUtils;

            scope.dateUtils = DateUtils;

            scope.userSession = UserSession.getUserId();

            var nextLoadDate = new Date();

            // Make query parameters to load products
            var queryParams = '?';

            // Expected date is isoDate
            if ('isodate' in attrs) {
                var tmpDateObj = new Date(attrs.isodate);
                queryParams += 'date=' + WebApi.makeDateQuery(tmpDateObj) + '&';
            }
            if ('submitter' in attrs) {
                queryParams += 'submitter=' + attrs.submitter + '&';
            }
            if ('country' in attrs) {
                queryParams += 'country=' + attrs.country + '&';
            }
            if ('category' in attrs) {
                queryParams += 'category=' + attrs.category + '&';
            }

            var getCommentsNum = function (product) {

               var queryParams = '?product=' + product._id;

                $http.get(WebApi.comments + queryParams).then(function(res) {

                    if (200 === res.status) {
                        product.commentNum = res.data.length;
                    } else {
                        product.commentNum = -1;
                    }
                });
            };

            // Load products from model
            $http.get(WebApi.products + queryParams).then(function (res) {

                var products = res.data;

                if (products) {

                    // To make it easy to use posted date
                    products.forEach(function(product) {
                        var isoDate = product.date;
                        product.date = new Date(isoDate);

                        UserUtils.getUserById(product.submitter).then(function(user) {
                            product.usericon = user.image;
                        });

                        getCommentsNum(product);
                    });

                    // TODO : ソートが必要ならここ

                    scope.products = products;

                } else {

                    console.log('Failed to get products');
                }

                var nextDate = nextLoadDate.getDate() - 1;
                nextLoadDate.setDate(nextDate);

            });

        }
    };
});
