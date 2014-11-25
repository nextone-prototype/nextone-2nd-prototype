/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .controller('IndexCtrl', function ($scope, $routeParams, UserSession) {

        // twitterOAuth redirects to this page with userId
        // Then store it into its cookie as 'userid'
        var userId = $routeParams.userid;

        if (userId) {
            UserSession.setUserId(userId);
            console.log('Set userId in its cookie : ' + userId);
        }
});
