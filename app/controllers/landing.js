'use strict';

var _ = require('underscore');
exports.play = function (req, res) {
    var presentation = req.presentation;
    var textVals = _.map(presentation.presentationData, function (presentationData) {
        return _.map(presentationData.keyVals, function (val, key) {
            if (_.isEqual('title', key) || key.indexOf('line') !== -1) {
                return val;
            }
        });
    });
    var description = _.chain(textVals).flatten().filter(function (value) {
        return !!value;
    }).reduce(function (val1, val2) {
            return val1 + "," + val2;
        }).value();
    res.render('landing/play', {
        title: presentation.presentationData[0].keyVals.title,
        description: description,
        presentationId: presentation._id

    });
};