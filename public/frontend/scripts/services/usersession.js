/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .service('UserSession', function ($routeParams, $cookieStore) {

        var KEY_USER_ID = 'userid';

        this.getUserId = function () {

            var id = $cookieStore.get(KEY_USER_ID) || $routeParams[KEY_USER_ID];

            return id;
        };

        this.setUserId = function (id) {

            $cookieStore.put(KEY_USER_ID, id);
        };

        this.removeUserId = function () {

            $cookieStore.remove(KEY_USER_ID);
        };

    }
);
