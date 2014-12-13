/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .directive('productsdaily',
        function ($location, DateUtils, CountryUtils) {

    var DAYS_TO_GET_ONE_SCROLL = 5;

    return {

        templateUrl: 'frontend/views/directives/productsdaily.html',

        restrict: 'E',

        link: function postLink(scope, element, attrs) {

            var nextLoadDate = new Date();

            // ISODate array which has been loaded
            // New date will be loaded when scroll() is called.
            scope.loadedDate = [];

            scope.focusedProduct = null;

            scope.onClickProduct = function(productId) {
                scope.focusedProduct = productId;
            };

            var scroll = function () {

                for (var i=0; i<DAYS_TO_GET_ONE_SCROLL; i++) {

                    scope.loadedDate.push(nextLoadDate.toISOString());

                    nextLoadDate.setDate(nextLoadDate.getDate() - 1);
                }
            };

            var getPreviousDay = function (date) {

                var tmpDate = new Date(date);

                tmpDate.setDate(date.getDate() - 1);

                return tmpDate;
            };

            scope.getDateString = function (isoDate) {

                var date = new Date(isoDate);

                var now = new Date();
                if (date.getFullYear() === now.getFullYear() &&
                    date.getMonth() === now.getMonth()) {

                    if (date.getDate() === now.getDate()) {
                        return "Today";
                    }

                    if (date.getDate() === getPreviousDay(now).getDate()) {
                        return "Yesterday";
                    }
                }

                return DateUtils.getMonth(date) + ' ' +
                    date.getDate() + DateUtils.getDateSuffix(date.getDate());
            };

            scope.more = function () {

                scroll();
            };

            scope.countries = CountryUtils;

            scope.comment = function (productId) {

                $location.path('comment/post/' + productId);
            };

            scroll();
        }
    };
});
