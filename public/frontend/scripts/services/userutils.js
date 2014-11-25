/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .service('UserUtils', function ($http, $q, WebApi) {

        // "users[userId]" stores data of the user.
        var users = [];

        /**
         * Return a promise to get user info by user ID.
         *
         * In case when the user has been cached, it returns immediately.
         * On the other hand, it accesses to server.
         *
         * @param userId Database ID of user
         * @param reload true when to load from server even if there's cache
         */
        this.getUserById = function (userId, reload) {

            var deferred = $q.defer();

            if (!reload && users[userId]) {

                deferred.resolve(users[userId]);

            } else {

                var queryParams = '?_id=' + userId;

                $http.get(WebApi.users + queryParams).then(function (res) {

                    // メモ : もしかしたらres.data[0] じゃなくても良いと思うけど…。
                    users[userId] = res.data[0];

                    deferred.resolve(users[userId]);
                });
            }

            return deferred.promise;
        };

    }
);
