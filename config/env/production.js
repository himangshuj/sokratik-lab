'use strict';

module.exports = {
    db: "mongodb://sokratik-trial:sokratik-trial@localhost:10000/sokratik-trial",
    app: {
        name: "Try Sokratik "
    },
    facebook: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    google: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    s3:{
        ACCESS_KEY: "AKIAJ6Q7O3H2BK6ZGNGA",
        SECRET: "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",
        BUCKET: "sokratik-audio",
        AUDIOLOCATION_PREFIX: "http://sokratik-audio.s3.amazonaws.com/"
    }
}
