/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

angular.module('appfront')
    .service('DateUtils', function () {

        this.getDateSuffix = function (day) {

            if (31 < day || 1 > day) {
                console.log('getDateSuffix recieved invalid day');
                return 'th';
            }
            else if (1 === day % 10 && 11 !== day) {
                return 'st';
            }
            else if (2 === day % 10 && 12 !== day) {
                return 'nd';
            }
            else if (3 === day % 10 && 13 !== day) {
                return 'rd';
            }
            else {
                return 'th';
            }
        };

        this.getMonth = function (date) {

            return ['January', 'February', 'March', 'April',
                'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'][date.getMonth()];
        };

        this.getDisplayDate = function (isoData) {

            var date = new Date(isoData);

            var year = ('0000' + String(date.getFullYear())).slice(-4);
            var month = ('00' + String(date.getMonth() + 1)).slice(-2);
            var day = ('00' + String(date.getDate())).slice(-2);
            var hour = ('00' + String(date.getHours())).slice(-2);
            var minute = ('00' + String(date.getMinutes())).slice(-2);

            var res = year + '/' + month + '/' + day + ' ' + hour + ':' + minute;

            return res;
        };

        this.getDisplayHour = function (isoData) {

            var date = new Date(isoData);

            var hour = ('00' + String(date.getHours())).slice(-2);
            var minute = ('00' + String(date.getMinutes())).slice(-2);

            var res = hour + ':' + minute;

            return res;
        };

    }
);
