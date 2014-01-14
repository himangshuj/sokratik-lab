'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    redisStore = require('connect-redis')(express),
    flash = require('connect-flash'),
    helpers = require('view-helpers'),
    config = require('./config');

module.exports = function(app, passport, db) {
    app.set('showStackError', true);

    //Prettify HTML
    app.locals.pretty = true;

    //Should be placed before express.static
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    //Don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(express.logger('dev'));
    }

    //Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    //Enable jsonp
    app.enable("jsonp callback");

    app.configure(function() {
        //cookieParser should be above session
        app.use(express.cookieParser());

        // request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());

        app.use(express.session({
            secret: "sokrat!k",

            store: new redisStore({
                host: config.redisUrl,
                port: config.redisPort,
                pass: config.redisPass
            })



        }));

        //connect flash for flash messages
        app.use(flash());

        //dynamic helpers
        app.use(helpers(config.app.name));

        //use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        //routes should be at the last
        app.use(app.router);
        
        //Setting the fav icon and static folder
        app.use(express.favicon());
        app.use(express.static(config.root + '/public'));

        //Assume "not found" in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
        app.use(function(err, req, res, next) {
            //Treat as 404
            if (~err.message.indexOf('not found')) return next();

            //Log it
            console.error(err.stack);

            //Error page
            res.status(500).render('500', {
                error: err.stack
            });
        });

        //Assume 404 since no middleware responded
        app.use(function(req, res, next) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });

    });
};