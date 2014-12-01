/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var launchParams = require('../../utils/launchParams').params();
var logger = require('../../utils/log').logger;
var User = require('../../model/user').model();

var CALLBACK_URL ='/auth/twitter/callback/';
var AUTHENTICATE_URL = '/auth/twitter';
var AUTHENTICATE_OK_URL = '/auth/twitter/authok';

var onGetToken = function(token, tokenSecret, profile, done) {

    var query = User.find();

    query.where('userId').equals(profile.id);
    query.limit(1);

    query.exec(function (err, users) {
        var addNewUser = function() {
            var newData = new User({
                userId : profile.id,
                accountPage : 'https://twitter.com/' + profile.username,
                name   : profile.displayName,
                image  : profile.photos[0].value
            });

            newData.save(function (err, newUser) {
                if (err) {
                    done(err, null);
                } else {
                    done(null, newUser);
                }
            });
        };

        if (err) {
            done(err, null);
        } else if (users[0]) {
            done(null, users[0]);
        } else {
            addNewUser();
        }
    });
};

var setupPassport = function (passport) {

    var TwitterStrategy = require('passport-twitter').Strategy;

    var strategy = new TwitterStrategy({
        consumerKey    : launchParams.twitter.consumer_key,
        consumerSecret : launchParams.twitter.consumer_secret,
        callbackURL    : CALLBACK_URL
    }, onGetToken);

    passport.serializeUser(function(user, done) {

        logger.debug('Twitter auth : ' + JSON.stringify(user));
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {

        logger.debug('Twitter auth deserializeUser : ' + JSON.stringify(obj));
        done(null, obj);
    });

    passport.use(strategy);
};

module.exports.setRoute = function (express) {

    var passport = require('passport');

    setupPassport(passport);

    // Should put following lines after express.session initialize
    // for that deserializeUser is called
    // http://stackoverflow.com/questions/21100327/what-could-be-causing-deserializeuser-to-not-get-called
    express.use(passport.initialize());
    express.use(passport.session());

    // Authenticate
    express.get(AUTHENTICATE_URL, passport.authenticate('twitter'));

    // Callback from twitter authentication
    express.get(CALLBACK_URL, passport.authenticate('twitter', {
            successRedirect : AUTHENTICATE_OK_URL,
            failureRedirect : '/'
        })
    );

    // To redirect to front end top with user ID (database)
    express.get(AUTHENTICATE_OK_URL, function (req, res) {
        res.redirect('/#/?userid=' + req.user._id);
    });

};
