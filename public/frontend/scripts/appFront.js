'use strict';

angular.module('appfront', ['ngResource', 'ngRoute', 'ngCookies', 'ui.bootstrap'])
  .config(function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {

            templateUrl : 'frontend/views/index.html',

            controller : 'IndexCtrl'
        })
        .when('/product/post', {

            templateUrl : 'frontend/views/postproduct.html'
        })
        .when('/comment/post/:product', {

            templateUrl : 'frontend/views/comment.html',

            controller : 'CommentCtrl'
        })
        .when('/product/:product', {

            templateUrl : 'frontend/views/product.html',

            controller : 'ProductCtrl'
        })
        .when('/user/:user', {

            templateUrl : 'frontend/views/userinfo.html',

            controller : 'UserinfoCtrl'
        })
        .when('/country/:country', {

            templateUrl : 'frontend/views/countryinfo.html',

            controller : 'CountryinfoCtrl'
        })
        .otherwise({

            redirectTo: '/'
        });

  });
