/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .service('VoteUtils', function ($http, $q, WebApi) {

        var votes = [];

        /**
         * Return a promise to get votes by entry ID.
         * entry is database ID of product, comment, user...etc.
         *
         * In case when votes have been cached, it returns immediately.
         * On the other hand, it accesses to server.
         *
         * @param entryId Database ID of entry
         * @param reload true when to load from server even if there's cache
         */
        this.getVotesByEntryId = function (entryId, reload) {

            var queryParams = '?entry=' + entryId;

            var deferred = $q.defer();

            if (!reload && votes[entryId]) {

                deferred.resolve(votes[entryId]);

            } else {

                $http.get(WebApi.votes + queryParams).then(function (res) {

                    votes[entryId] = res.data;

                    deferred.resolve(votes[entryId]);
                });
            }

            return deferred.promise;
        };

    }
);
