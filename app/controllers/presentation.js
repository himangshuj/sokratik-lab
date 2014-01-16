'use strict';
var mongoose = require('mongoose'),
    _ = require('underscore'),
    Presentation = mongoose.model('Presentation'),
    knox = require('knox'),
    fs = require('fs'),
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

function resolveAudioLocation(presentation, presentationId, callback) {
    if (!!s3Client) {
        if (fs.exists('/tmp/recordings/' + presentationId.ogg)) {
            callback('/recordings/' + presentationId + '.ogg');
        } else {
            s3Client.head('/auphonic/' + presentationId + '.ogg').on('response',function (res) {
                var modifiedTime = (new Date(presentation.upDatedOn)).getTime();
                var currentTime = (new Date()).getTime();
                if ((res.statusCode === 200) &&
                    ((modifiedTime - (new Date(res.headers['last-modified'])).getTime()) < 100000) &&
                    (currentTime - modifiedTime > 100000)) {
                    console.log('Negative time' + (modifiedTime - (new Date(res.headers['last-modified'])).getTime()));

                    callback(s3AudioLocation('auphonic', presentationId));
                } else {
                    s3Client.head('/raw-recordings/' + presentationId + '.ogg').on('response',function (res) {
                        if (res.statusCode === 200) {
                            callback(s3AudioLocation('raw-recordings', presentationId));
                        } else {
                            console.log('where am I??');
                            callback('/recordings/' + presentationId + '.ogg');
                        }
                    }).end();

                }
            }).end();
        }
    } else {
        callback('/recordings/' + presentationId + '.ogg');
    }
}

exports.all = function (req, res) {
    if (req.user) {
        Presentation.find({'authors.username': req.user.username, 'deleted': {$ne: true}}).sort('-upDatedOn').exec(function (err, presentations) {
            if (!err) {
                res.jsonp(_.map(presentations, function (presentation) {
                    var titleSlide = presentation.presentationData[0];
                    return  _.extend({id: presentation._id,
                        upDatedOn: presentation.upDatedOn,
                        summary: presentation.summary,
                        conceptParams: presentation.conceptParams
                    }, titleSlide.keyVals);
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
                keyVals: {title: 'Presentation Title'}
            }
        ]
    };
    presentation = _.extend(presentation, init);

    presentation.save(function (err) {
        if (err) {
            res.send('users/signup', {
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
        resolveAudioLocation(req.presentation, req.presentation._id, function (audiolocation) {
            req.presentation.audioLocation = audiolocation;
            next();
        });
    });
};

exports.savePresentation = function (req, res) {
    var presentation = req.presentation || (new Presentation());

    presentation = _.extend(presentation, _.omit(req.body, '__v'));

    presentation.upDatedOn = new Date();

    presentation.save(function (err, presentation) {
        res.jsonp(presentation);
    });

};

exports.deletePresentation = function (req, res) {
    var presentation = req.presentation;
    presentation.deleted = true;
    presentation.save(function (err) {
        console.log(err);
        res.jsonp(presentation);
    });
};
exports.show = function (req, res) {
    res.jsonp(req.presentation);
};

exports.play = function (req, res) {
    res.render('play', {
        presentation: JSON.stringify(req.presentation),
        audioLocation: req.presentation.audioLocation

    });
};

exports.relatedImages = function (req, res) {
    res.jsonp([]);
};
