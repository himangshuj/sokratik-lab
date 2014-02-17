'use strict';

var logger = require('../../config/logging');

exports.info = function (req, res) {
    logger.info({head:req.headers,body: req.body});
    res.jsonp('logged');

};
exports.error = function (req, res) {
    logger.error({head:req.headers,body: req.body});
    res.jsonp('logged');

};
