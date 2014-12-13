/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

/**
 directiveにng-modelを適用する
 https://egghead.io/lessons/angularjs-using-ngmodel-in-custom-directives
*/
angular.module('appfront')
    .directive('productdetail',
        function ($http, WebApi, UserUtils, DateUtils) {

        return {
            templateUrl: 'frontend/views/directives/productdetail.html',

            restrict: 'E',

            link: function(scope, element, attrs) {

                var update = function () {
                    var productApi = WebApi.products + '?_id=' + scope.productId;

                    // Load the detail of this product
                    $http.get(productApi).then(function (res) {

                        scope.product = res.data[0];

                        UserUtils.getUserById(scope.product.submitter)
                        .then(function (submitter) {

                            scope.submitter = submitter;
                        });

                    });
                };

                scope.productId = attrs.product;

                scope.formatDate = function (isoDate) {
                    return DateUtils.getDisplayDate(isoDate);
                };

                console.log('aaaaaa : ' + location.href);
            }
        };
    }
);
