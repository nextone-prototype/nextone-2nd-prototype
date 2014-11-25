/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .directive('votebtn', function ($http, WebApi, VoteUtils, UserSession) {

    return {

        templateUrl: 'frontend/views/directives/votebtn.html',

        restrict: 'E',

        link: function postLink(scope, element, attrs) {

            scope.votes = [];

            scope.userSession = UserSession.getUserId();

            scope.getVoteByUser = function () {

                for (var i = 0; i < scope.votes.length; i++) {

                    if (scope.votes[i].user === scope.userSession) {

                        return scope.votes[i];
                    }
                }

                return null;
            };

            scope.vote = function () {

                var v = {
                    user : scope.userSession,
                    entry : attrs.entry
                };

                $http.post(WebApi.votes, v).then(function (res) {

                    if (200 === res.status) {
                        getVotes(true);
                    }
                });
            };

            scope.cancelVote = function () {

                var voteByUser = scope.getVoteByUser();

                var queryParameter = "?_id=" + voteByUser._id;

                $http.delete(WebApi.votes + queryParameter).then(function (res) {

                    if (204 === res.status) {

                        getVotes(true);
                    }
                });
            };

            var getVotes = function (reload) {

                VoteUtils.getVotesByEntryId(attrs.entry, reload).then(function (votes) {

                    scope.votes = (votes) ? votes : [];
                });
            };

            getVotes(false);

        }

    };

});
