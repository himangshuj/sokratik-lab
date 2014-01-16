'use strict';

exports.render = function(req, res) {
    req.flash()
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};
