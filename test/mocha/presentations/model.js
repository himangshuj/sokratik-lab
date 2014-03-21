'use strict';

/**
 * Module dependencies.
 */


var should = require('should'),
    mongoose = require('mongoose'),
    _ = require('../../../vendor/underscore/underscore'),
    mongo = require('../../helpers/mongo')(),
    presentation = require('../../../app/models/presentation')(mongoose);

var Presentation = mongoose.model('Presentation');
//Globals
var presentation1, presentation2;

//The tests
describe('<Unit Test>', function () {
    describe('Model Presentation:', function () {
        before(function (done) {
            presentation1 = new Presentation({
                upDatedOn: new Date('October 13, 2013 11:13:00'),
                presentationData: [
                    {
                        keyVals: {key1: 'v1',
                            key2: 'v2'},
                        templateName: 'templateName'

                    }
                ],
                script: [
                    {
                        fnName: 'fnNam1',
                        actionInitiated: 11111111,
                        args: {index: 4},
                        module: 'module'
                    }
                ],
                recordingStarted: new Date('October 15, 2013 11:23:00'),
                annotation: {},
                files: [],
                audioLocation: 'somewhere on internet',
                authors: [
                    {
                        username: 'Himangshu',
                        description: 'test case',
                        role: ["admin"],
                        percentageContribution: 100
                    }
                ],
                voting: {
                    upVote: 560,
                    downVote: 0
                },

                contentParams: {
                    concept: ['TDD', 'mochaTest'],
                    subject: ['Software'],
                    location: 'Bangalore',
                    language: ['javascript']
                }

            });
            presentation2 = new Presentation({
                upDatedOn: new Date('October 15, 2013 11:13:00'),
                presentationData: [
                    {
                        keyVals: {key1: 'v1',
                            key2: 'v2'},
                        templateName: 'templateName'

                    }
                ],
                script: [
                    {
                        fnName: 'fnName',
                        actionInitiated: 11111111,
                        args: {index: 4},
                        module: 'module'
                    }
                ],
                recordingStarted: new Date('October 15, 2013 11:23:00'),
                annotation: {},
                files: [],
                audioLocation: 'somewhere on internet',
                authors: [
                    {
                        username: 'Aniket',
                        description: 'test case',
                        role: ["admin"],
                        percentageContribution: 100
                    }
                ],
                voting: {
                    upVote: 560,
                    downVote: 0
                },

                contentParams: {
                    concept: ['TDD', 'mochaTest'],
                    subject: ['Software'],
                    location: 'Bangalore',
                    language: ['javascript']
                }

            });


            done();
        });

        describe('Method Save', function () {
            it('should begin with no presentation', function (done) {
                Presentation.find({}, function (err, presentations) {
                    presentations.should.have.length(0);
                    done();
                });
            });

            it('should be able to save whithout problems', function (done) {
                presentation1.save(done);
            });
            it('should have 1 presentation', function (done) {
                Presentation.find({}, function (err, presentations) {
                    presentations.should.have.length(1);
                    done();
                });
            });
            it('should be able to save whithout problems', function (done) {
                presentation2.save(done);
            });
            it('should have 2 presentation', function (done) {
                Presentation.find({}, function (err, presentations) {
                    presentations.should.have.length(2);
                    done();
                });
            });

            it('fetch presentation test', function (done) {
                Presentation.find({'authors.username': 'Himangshu', 'deleted': {$ne: true}}, function (err, presentations) {
                    presentations.should.have.length(1);
                    done();
                });
            });

            it('fallbackscript test', function (done) {
                var presentationConsidered = presentation1;
                var page = 0;
                var startTime = (new Date()).getTime();
                presentationConsidered.fallBackScript = _.flatten(_.map(presentationConsidered.presentationData, function (presentationData) {
                    var fragmentIndex = 0;
                    return _.union(
                        [
                            {fnName: 'changeState', args: {subState: 'active', params: {page: page++}},
                                actionInitiated: startTime,
                                module: 'dialogue'}
                        ], _.map(presentationData.keyVals, function (key, val) {
                            return {'fnName': 'makeVisible', module: 'dialogue',
                                args: {index: fragmentIndex++},
                                actionInitiated: ((startTime += _.size(key) * 1000 ) - _.size(key) * 1000 )};//ensuring startTime is incremented after assignment
                        }));
                }));
                presentationConsidered.save(function (err, obj) {
                    console.log(obj.fallBackScript);
                    done();
                });
            });
        });


        after(function (done) {
            Presentation.remove().exec();
            done();
        });
    });
});