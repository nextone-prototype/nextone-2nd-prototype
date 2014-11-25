/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var makeDummyObjIds = require('../../unittestutil').makeDummyObjectIds;
var comment = require('../../../model/comment');
var DataTestBase = require('./dataTestBase');

describe('Route comment test', function() {

    var testBase = new DataTestBase(comment.model());

    // 3 dummy users
    var users = makeDummyObjIds(3);

    // 2 dummy products
    var products = makeDummyObjIds(2);

    // Test data set for dummy DB entries
    var testDataSet = [
        {
            comment : 'aaa',
            user : users[0],
            product : products[0]
        },
        {
            comment : 'bbb',
            user : users[1],
            product : products[0]
        },
        {
            comment : 'ccc',
            user : users[1],
            product : products[1]
        },
        {
            comment : 'ddd',
            user : users[2],
            product : products[0]
        },
        {
            comment : 'eee',
            user : users[2],
            product : products[1]
        }
    ];

    // Set before/after method
    testBase.setup(testDataSet);


    // Test for GET method
    var testDataForGet = [
        {
            'queries' : {
                'limit' : 3
            },
            'expectNum' : 3
        },

        {
            'queries' : {
                'limit' : testDataSet.length + 10
            },
            'expectNum' : testDataSet.length
        },

        {
            'queries' : {
                'product' : products[0]
            },
            'expectNum' : 3
        },

        {
            'queries' : {
                'product' : products[0],
                'limit'   : 2
            },
            'expectNum' : 2
        },

        {
            'queries' : {
                'user' : users[0]
            },
            'expectNum' : 1
        }
    ];

    describe('GET', testBase.testGet('/comments', testDataForGet));


    // Test for POST method
    var dataToPost = [
        {
            condition : 'Post a data which has all fields',
            data : {
                comment : 'new comment',
                user : users[0],
                product : products[0]
            }
        }
    ];

    var invalidToPost = [
        {
            condition : 'No comment is posted',
            data : {
                user : users[0],
                product : products[0]
            }
        }
    ];

    describe('POST', testBase.testPost('/comments', dataToPost, invalidToPost))


    // Test for DELETE method
    var testDataForDelete = [

        {
            'queries' : {
                'product' : products[0]
            },
            'expectCode' : 204,
            'expectNum'  : testDataSet.length - 3

        },

        // Delete with no query should be handled as error.
        {
            'expectCode' : 403,
            'expectNum'  : testDataSet.length
        }

    ];

    describe('DELETE', testBase.testDelete('/comments', testDataForDelete));


    // Test for PUT method
    var testDataForPut = [

        {
            'condition' : 'Update comment',
            'updateData' : {
                'comment': 'Updated!!!!!'
            }
        }

    ];

    describe('PUT', testBase.testPut('/comments', testDataForPut));

});
