'use strict';

module.exports = function (app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    //Setting up the users api
    app.post('/users/create', users.create);

    //Setting the local strategy route
    app.post('/users/session', passport.authenticate('local'), users.session);

    //Setting the local strategy ajax route

    app.post('/users/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.jsonp({message:'loginFailed'});
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.jsonp({message:'success'});
            });
        })(req, res, next);
    });

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me']
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    var presentations = require('../app/controllers/presentation');
    app.get('/presentations', presentations.all);
    app.post('/presentation', presentations.create);
    app.get('/presentation/:presentationId', presentations.show);
    app.put('/presentation/:presentationId', presentations.savePresentation);
    app.delete('/presentation/:presentationId', auth.requiresLogin, presentations.deletePresentation);


    //Finish with setting up the articleId param
    app.param('presentationId', presentations.presentation);


    //Finish with setting up the userId param
    app.param('userId', users.user);


    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
    app.get('/home', index.render);
    app.get('/login', index.render);
    app.get('/list', index.render);
    app.get('/create', index.render);
    app.get('/create/:presentationId', index.render);
    app.get('/related-images/:pId', presentations.relatedImages);


    //Presentation Landing
    var landing = require('../app/controllers/landing');
    app.get('/play/:presentationId',landing.play);
};
