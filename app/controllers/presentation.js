'use strict';
var mongoose = require('mongoose'),
    _ = require('../../vendor/underscore/underscore'),
    Presentation = mongoose.model('Presentation');


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
    Presentation.find({_id: id}, function (err, presentation) {
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
    res.jsonp(req.presentation);
};


