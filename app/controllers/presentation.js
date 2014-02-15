'use strict';
var mongoose = require('mongoose'),
    _ = require('underscore'),
    Presentation = mongoose.model('Presentation'),
    knox = require('knox'),
    fs = require('fs'),
    uuid = require('node-uuid'),
    logger = require('../../config/logging'),
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
    var audioToken = presentation.audioRecorded ? ( presentationId + '_' + presentation.audioRecorded) : presentationId;
    if (!!s3Client) {
        if (fs.exists('/tmp/recordings/' + presentation.audioId + '.ogg')) {
            callback('/recordings/' + audioToken + '.ogg');
        } else {
            s3Client.head('/auphonic/' + audioToken + '.ogg').on('response',function (res) {
                var modifiedTime = (new Date(presentation.upDatedOn)).getTime();
                var currentTime = (new Date()).getTime();
                if ((res.statusCode === 200) &&
                    ((modifiedTime - (new Date(res.headers['last-modified'])).getTime()) < 100000) &&
                    (currentTime - modifiedTime > 100000)) {
                    logger.debug('Negative time' + (modifiedTime - (new Date(res.headers['last-modified'])).getTime()));

                    callback(s3AudioLocation('auphonic', audioToken));
                } else {
                    s3Client.head('/raw-recordings/' + audioToken + '.ogg').on('response',function (res) {
                        if (res.statusCode === 200) {
                            callback(s3AudioLocation('raw-recordings', audioToken));
                        } else {
                            logger.debug('[WTF] no recordings for ' + presentationId);
                            callback('/recordings/' + audioToken + '.ogg');
                        }
                    }).end();

                }
            }).end();
        }
    } else {
        callback('/recordings/' + audioToken + '.ogg');
    }
}

var parseContentParams = function (contentParams) {
    return _.chain({})
        .extend(_.pick(contentParams, 'concept', 'subject'), _.pick(contentParams.boardMap, 'board', 'class'))//TODO black magic write about it
        .values()
        .flatten()
        .value();
};
exports.all = function (req, res) {
    if (req.user) {
        Presentation.find({'authors.username': req.user.username, 'deleted': {$ne: true}}).sort('-upDatedOn').exec(function (err, presentations) {
            if (!err) {
                res.jsonp(_.map(presentations, function (presentation) {
                    var titleSlide = presentation.presentationData[0]|| {};
                    return  _.extend({id: presentation._id,
                        upDatedOn: presentation.upDatedOn,
                        summary: presentation.summary,
                        contentParams: parseContentParams(presentation.contentParams)
                    }, titleSlide.keyVals || {} );
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
                keyVals: {title: 'Title'}
            }
        ],
        audioId: uuid.v4()

    };
    presentation = _.extend(presentation, init);

    presentation.save(function (err) {
        if (err) {
            res.send('users/signup', {
                errors: err.errors,
                presentation: presentation
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

exports.hasAccess = function (req, res, next) {

    var authors = _.chain(req.presentation.authors).pluck('username')
        .filter(function (username) {
            return _.isString(username);
        }).value();
    if (_.isEmpty(authors) || _.contains(authors, (req.user || {}).username)) {
        next();
    } else {
        return res.send(401, 'User is not authorized');
    }

};

var sanitizeRequestBody = function (presentation) {
    var script = _.without(presentation.script, null);
    var presentationData = _.without(presentation.presentationData, null);
    return _.chain(presentation).omit('__v').extend({script: script, presentationData: presentationData}).value();
};

exports.savePresentation = function (req, res) {
    var presentation = req.presentation || (new Presentation());

    presentation = _.extend(presentation, sanitizeRequestBody(req.body));

    presentation.upDatedOn = new Date();

    presentation.save(function (err, presentation) {
        if (err) {
            logger.error({head: req.headers, body: req.body, error: err.stack});
        }
        try {
            res.jsonp(presentation);
        } catch (err) {
            res.jsonp({});
        }
    });

};

exports.completePresentation = function (req, res) {
    req.presentation.audioRecorded = req.presentation.audioId ;
    req.presentation.audioId = uuid.v4();
    req.presentation.save();
    var clonedPresentation = new Presentation(_.without(req.presentation, '_id'));
    clonedPresentation.authors = [
        {
            name: 'sokratik-admin',
            description: 'description',
            role: 'Owner',
            percentageContribution: '100',
            username: 'admin@sokratik.com'
        }
    ];
    clonedPresentation.save(function () {
        res.jsonp('done');
    });
    console.log(clonedPresentation.audioRecorded);
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


