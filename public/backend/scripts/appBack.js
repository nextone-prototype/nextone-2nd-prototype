/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 **/
'use strict';

// Angular app of backend app
angular.module('appback', ['ngResource', 'ngRoute', 'ui.sortable'])
  .config(function($routeProvider) {

    $routeProvider
      .when('/', {

        templateUrl: 'backend/views/index.html'
      })
      .when('/country', {

        templateUrl: 'backend/views/country.html',
        controller: 'CountryCtrl'
      })
      .when('/region', {

        templateUrl: 'backend/views/region.html',
        controller: 'RegionCtrl'
      })
      .otherwise({

        redirectTo: '/'
      });

  }
);
