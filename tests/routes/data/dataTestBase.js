/**
 * Copyright (c)
 * 2014 Tsuyoyo. All Rights Reserved.
 */
'use strict';

var should = require('should');
var request = require('supertest');
var saveTestData = require('../../unittestutil').saveTestData;
var dummyDb = require('../../unittestdb');
var apiFormatter = require('../../../routes/apiformat').format;
var logger = require('../../../utils/log').logger;
var verifyCount = require('../../unittestutil').verifyCount;

/**
 * Base class of router/data test
 *
 */
function DataTestBase(model) {

    this.model = model;
};


DataTestBase.prototype.setup = function(dataSet) {

    var self = this;

    var dummyDb = require('../../unittestdb');

    before(function() {

        // Load dummy params
        require('../../unittestparams').load();

        dummyDb.connect();

        self.app = require('../../../app');
    });

    beforeEach(function(done) {

        self.testData = new Array(dataSet.length);

        saveTestData(dataSet, self.testData, self.model, done);
    });

    afterEach(function(done) {

        self.model.remove(function(err) {
            if (err) {
                logger.error('Failed remove Comment : ' + err);
            }
            done();
        });
    });

    after(dummyDb.dropAndDisconnect);

};

DataTestBase.prototype.testGet = function(apiPath, testItems) {

    var self = this;

    return function() {

        var execTest = function(route, expectCode, verify, done) {
            request(self.app)
            .get(apiFormatter(route))
            .expect(expectCode)
            .end(function(err, res) {
                if (err) {
                     done(err);
                } else {
                    verify(res);
                    done();
                }
            });
        };

        describe(apiPath, function() {

            it('should return all data', function(done) {
                var verify = function (res) {
                    should.equal(res.body.length, self.testData.length);
                };
                execTest(apiPath, 200, verify, done);
            });

        });

        testItems.forEach(function(item) {

            if (!item.queries || 0 === item.queries.length) {
                console.log('There is invalid test item for GET');
                return;
            }

            var queryParams = "";

            for (var key in item.queries) {

                if (0 < queryParams.length) {
                    queryParams += '&';
                }
                queryParams += key + '=' + item.queries[key];
            }

            var api = apiPath + '?' + queryParams;

            describe(api, function(done) {

                it('should return ' + item.expectNum + ' data', function(done) {

                    var verify = function(res) {
                        should.equal(res.body.length, item.expectNum);
                    };

                    execTest(api, 200, verify, done);
                });

            });
        });
    };
};


DataTestBase.prototype.testPost = function(apiPath, correctData, wrongData) {

    var self = this;

    return function() {

        var execTest = function(data, expectCode, verify) {
            var req = request(self.app)
                .post(apiFormatter(apiPath))
                .send(data)
                .expect(expectCode)
                .end(verify);
        };

        // Verify below by posting data
        // - 200 is returned as a result of post
        // - Entry has increased after posting
        correctData.forEach(function(item) {

            describe(item.condition, function() {

                it('should return 200', function(done) {

                    var verify = function(err, res) {
                        if (err) {
                            done(err);
                        } else {
                            done();
                        }
                    };

                    execTest(item.data, 200, verify, done);
                });

                it('should increase the entry', function(done) {

                    var verify = function(err, res) {
                        if (err) {
                            done(err);
                        } else {
                            verifyCount(self.model, self.testData.length + 1, done);
                        }
                    };

                    execTest(item.data, 200, verify, done);
                });
            });

        });

        // Verify 500 is returned as a result when invalid data is post.
        // For example, a field which is 'required' is lack.
        wrongData.forEach(function(item) {

            describe(item.condition, function() {

                it('should return 500', function(done) {

                    execTest(item.data, 500, done);
                });
            });
        });
    };
};

DataTestBase.prototype.testDelete = function(apiPath, testItems) {

    var self = this;

    return function() {

        var execTest = function(route, expectCode, verify) {
            request(self.app)
            .del(apiFormatter(route))
            .expect(expectCode)
            .end(verify);
        };

        // Reserve 'Delete by id' test case,
        // because it's quite basic test and _id is dynamic data
        // (depends on DB registration), so it cannot be included in testItems.
        describe('Delete by _id', function() {

            it('should return 204', function(done) {

                var api = apiPath + '?_id=' + self.testData[0]._id;

                execTest(api, 204, done);
            });

            it('Number of entry should be decreased', function(done) {

                var api = apiPath + '?_id=' + self.testData[0]._id;

                var verify = function(err, res) {
                    if (err) {
                        done(err);
                    } else {
                        verifyCount(self.model, self.testData.length - 1, done);
                    }
                };

                execTest(api, 204, verify);
            });
        });

        // Test cases based on testItems.
        testItems.forEach(function(item) {

            // Make query parameters from testItems
            var queryParams = null;

            if (item.queries) {

                queryParams = '';

                for (var key in item.queries) {

                    if (0 < queryParams.length) {
                        queryParams += '&';
                    }
                    queryParams += key + '=' + item.queries[key];
                }
            }

            // Make test cases
            var api = (queryParams) ? apiPath + '?' + queryParams : apiPath;

            describe(api, function() {

                it('should return ' + item.expectCode, function(done) {

                    execTest(api, item.expectCode, done);
                });

                it('Number of entry should be ' + item.expectNum, function(done) {

                    var verify = function(err, res) {
                        if (err) {
                            done(err);
                        } else {
                            verifyCount(self.model, item.expectNum, done);
                        }
                    };

                    execTest(api, item.expectCode, verify);
                });
            });
        });
    };
};


/**
 * Provides test template which to do below testing
 *  - testData could be an array
 *  - this.testData[0] will be updated by PUT call
 *  - verify the response is 200
 *  - verify an entry of the updated data in DB is also updated
 *
 */
DataTestBase.prototype.testPut = function(apiPath, testData) {

    var self = this;

    return function() {

        var execTest = function(route, updateData, expectCode, verify) {
            var req = request(self.app)
                .put(apiFormatter(route))
                .send(updateData)
                .expect(expectCode)
                .end(verify);
        };

        testData.forEach(function(item) {

            var verifyUpdated = function(id, key, value, callback) {

                var query = self.model.where('_id').equals(id);

                var onFound = function(err, foundData) {
                    if (err) {
                        callback(err);
                    } else {
                        should.equal(foundData.length, 1);
                        foundData[0][key].should.eql(value);
                        callback();
                    }
                };

                query.exec(onFound);
            };

            describe(item.condition, function() {

                it('should return 200 and updated data', function(done) {

                    var targetId = self.testData[0]._id;

                    var verify = function(err, res) {
                        if (err) {
                            done(err);
                        } else {
                            var key = Object.keys(item.updateData)[0];
                            var value = item.updateData[key];
                            verifyUpdated(targetId, key, value, done);
                        }
                    };

                    var route = apiPath + '?_id=' + targetId;

                    execTest(route, item.updateData, 200, verify);
                });
            });
        });
    };
};

module.exports = DataTestBase;
