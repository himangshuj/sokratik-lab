'use strict';
var mongoose = require('mongoose'),
    _ = require('../../vendor/underscore/underscore'),
    Presentation = mongoose.model('Presentation'),
    knox = require('knox'),
    config = require('../../config/config');

if (!!config.s3) {
    var s3Client = knox.createClient({
        key: config.s3.ACCESS_KEY,
        secret: config.s3.SECRET,
        bucket: config.s3.BUCKET
    });
}

function s3AudioLocation(prefix, answerId) {
    return (config.s3.AUDIOLOCATION_PREFIX + prefix + '/' + answerId + '.ogg');
}

function resolveAudioLocation(presentation, answerId, callback) {
    if (!!s3Client) {
        s3Client.head('/auphonic/' + answerId + '.ogg').on('response',function (res) {
            if (res.statusCode == 200) {
                callback(s3AudioLocation('auphonic', answerId), presentation);
            } else {
                s3Client.head('/sokratik-post-processor/' + answerId + '.ogg').on('response',function (res) {
                    if (res.statusCode == 200) {
                        callback(s3AudioLocation('sokratik-post-processor', answerId), presentation);
                    } else {
                        s3Client.head('/raw-recordings/' + answerId + '.ogg').on('response',function (res) {
                            if (res.statusCode == 200) {
                                callback(s3AudioLocation('raw-recordings', answerId), presentation);
                            } else {
                                callback("/recordings/" + answerId + ".ogg", presentation);
                            }
                        }).end();
                    }
                }).end();
            }
        }).end();
    } else {
        callback("/recordings/" + answerId + ".ogg", presentation);
    }
}

exports.all = function (req, res) {
    if (req.user) {
        Presentation.find({'authors.username': req.user.username}).sort('-upDatedOn').exec(function (err, presentations) {
            if (!err) {

                res.jsonp(_.map(presentations, function (presentation) {
                    var titleSlide = presentation.presentationData[0];
                    return  _.extend({id:presentation._id},titleSlide.keyVals) ;
                }));
            } else {
                res.jsonp([]);
            }
        });
    } else {
        res.jsonp([]);
    }
};

/**
 * Create a presentation
 */
exports.create = function (req, res) {
    var presentation = new Presentation(req.body);
    var user = req.user || {};
    var init = {
        authors: [
            {
                name: user.name,
                description: 'description',
                role: 'Owner',
                percentageContribution: '100',
                username: user.username
            }
        ],
        voting: {
            'upVote': 0,
            'downVote': 0
        },
        presentationData: [
            {
                templateName: 'title',
                keyVals: {title:'What do you want to tell?'}
            }
        ]
    };
    presentation = _.extend(presentation, init);

    presentation.save(function (err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: presentation
            });
        } else {
            res.jsonp(presentation);
        }
    });
};

/**
 * Find presentation by id
 */
exports.presentation = function (req, res, next, id) {
    Presentation.findOne({_id: id}, function (err, presentation) {
        if (err) return next(err);
        if (!presentation) return next(new Error('Failed to load presentation ' + id));
        req.presentation = presentation;
        next();
    });
};

exports.savePresentation = function (req, res) {
    var presentation = req.presentation || (new Presentation());

    presentation = _.extend(presentation, req.body);

    presentation.save(function () {
        res.jsonp(presentation);
    });

};
exports.show = function (req, res) {
    var renderCallback = function (audioLocation, presentation) {
        presentation.audioLocation = audioLocation;
        res.jsonp(presentation);
    };
    if (req.presentation.audioLocation) {
        res.jsonp(req.presentation);  //TODO this is buggy
    } else {
        resolveAudioLocation(req.presentation, req.presentation._id, renderCallback);
    }
};
