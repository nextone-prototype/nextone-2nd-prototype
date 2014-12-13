/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .directive('voteinfo', function (VoteUtils, UserUtils, $q) {

    return {

        templateUrl: 'frontend/views/directives/voteinfo.html',

        restrict: 'E',

        link: function postLink(scope, element, attrs) {

            var entryId = attrs.entry;

            // Load votes for this product
            var loadVotes = function () {

                VoteUtils.getVotesByEntryId(entryId).then(function (votes) {

                    var loadUserIcon = function (vote) {

                        var deferred = $q.defer();

                        UserUtils.getUserById(vote.user).then(function(user) {
                            if (user) {
                                vote.userIcon = user.image;
                            }
                            deferred.resolve();
                        });

                        return deferred.promise;
                    };

                    // Set promises to load each icons
                    var promises = [];

                    for (var i = 0; i < votes.length; i++) {

                        promises.push(loadUserIcon(votes[i]));
                    }

                    // Invoke load user icons
                    if (0 < promises.length) {

                        $q.all(promises).then(function(){
                            scope.votes = votes;
                        });

                    } else {

                        scope.votes = votes;
                    }

                });
            };

            scope.$watch('votes', function () {

                loadVotes();
            });

            loadVotes();
        }
    };
});
