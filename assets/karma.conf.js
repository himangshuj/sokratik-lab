// Karma configuration
// Generated on Fri Dec 27 2013 18:57:15 GMT+0530 (IST)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../vendor/angular/angular.js',
            '../vendor/angular-elastic/elastic.js',
            '../vendor/angular-ui-router/release/angular-ui-router.js',
            '../vendor/underscore/underscore.js',
            '../public/js/templates-app.js',
            '../vendor/yepnope/yepnope*.js',
            '../vendor/angular-mocks/angular-mocks.js',
            '../vendor/angular-sanitize/angular-sanitize.min.js',
            '../vendor/angular-cookies/angular-cookies.min.js',
            '../vendor/angular-resource/angular-resource.min.js',
            '../vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
            '../vendor/angular-ui-router/release/angular-ui-router.js',
            '../vendor/angular-ui-utils/ui-utils.js',
            '../vendor/underscore/underscore-min.js',
            '../vendor/underscore.string/dist/underscore.string.min.js',
            '../vendor/angular-animate/angular-animate.min.js',
            '../vendor/kineticjs/dist/kinetic-v4.7.3.js',
            '../public/js/temp*.js' ,
            '../vendor/angular-mocks/angular-mocks.js',
            '../atelier/src/testingmocks/acoustics.spec.js',
            '../atelier/src/common/**/*.js',
            '../atelier/src/app/**/*.js',
            'js/app/**/*.js',
            'js/common/**/*.js',
            'js/**/*.spec.js',

        ],


        // list of files to exclude
        exclude: [

        ],


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],


        // web server port
        port: 9018,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['Chrome', 'Firefox'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
