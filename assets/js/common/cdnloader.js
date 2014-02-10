window.onload = function () {
    yepnope.errorTimeout=5000;
    yepnope([
        {
            load: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js',
            complete: function () {
                if (!window.angular) {
                    yepnope('/static/js/lib/angular.min.js');
                }
            }
        },
        {
            load: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-cookies.min.js',
            complete: function () {
                if (!angular.module('ngCookies')) {
                    yepnope('/static/js/lib/angular-cookies.min.js');
                }
            }
        },
        ,
        {
            load: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-sanitize.min.js',
            complete: function () {
                if (!angular.module('ngSanitize')) {
                    yepnope('/static/js/lib/angular-sanitize.min.js');
                }
            }
        }
        ,
        {
            load: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-resource.min.js',
            complete: function () {
                if (!angular.module('ngResource')) {
                    yepnope('/static/js/lib/angular-resource.min.js');
                }
            }
        }  ,
        {
            load: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-animate.min.js',
            complete: function () {
                if (!angular.module('ngAnimate')) {
                    yepnope('/static/js/lib/angular-animate.min.js');
                }
            }
        } ,
        {
            load: '//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.9.0/ui-bootstrap-tpls.min.js',
            complete: function () {
                if (!angular.module('ui.bootstrap')) {
                    yepnope('/static/js/lib/ui-bootstrap-tpls.min.js');
                }
            }
        },
        {
            load: '//cdn.jsdelivr.net/angular.ui-router/0.2.8/angular-ui-router.min.js',
            complete: function () {
                if (!angular.module('ui.router')) {
                    yepnope('/static/js/lib/angular-ui-router.min.js');
                }
            }
        },
        {
            load: '//cdnjs.cloudflare.com/ajax/libs/stacktrace.js/0.5.3/stacktrace.min.js',
            complete: function () {
                if (!window.printStackTrace) {
                    yepnope('/static/js/lib/stacktrace.min.js');
                }
            }
        },
        {
            load: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js',
            complete: function () {
                if (!window._) {
                    yepnope('/static/js/lib/underscore.min.js');
                }
            }
        },
        {
            load: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js',
            complete: function () {
                if (!window._) {
                    yepnope('/static/js/lib/underscore.min.js');
                }
                yepnope('/static/js/sokratik_v340.js')
            }
        },
        {
            load: '//cdnjs.cloudflare.com/ajax/libs/underscore.string/2.3.3/underscore.string.min.js',
            complete: function () {
                if (!window._.str) {
                    yepnope('/static/js/lib/underscore.string.min.js');
                }
            }
        }
        ,
        {
            load: 'http://cdn.binaryjs.com/0/binary.min.js',
            complete: function () {
                if (!window.BinaryClient) {
                    yepnope('/static/js/lib/binary.min.js');
                }
            }
        } ,
        {
            load: '//d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.4.min.js',
            complete: function () {
                if (!window.Kinetic) {
                    yepnope('/static/js/lib/kinetic-v4.7.3.min.js');
                }
            }
        }   ,
        {
            load: '//www.youtube.com/iframe_api',
            complete: function () {
                if (!window.YT) {
                    yepnope('/static/js/lib/iframe_api.js');
                }
            }
        }


    ]);


};