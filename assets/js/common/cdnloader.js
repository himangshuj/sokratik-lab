window.onload = function () {
    yepnope.errorTimeout = 2000;
    yepnope([
        {
          load:['//ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-cookies.min.js','//ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-sanitize.min.js',
          '//ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-resource.min.js','//ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-animate.min.js']
        },
        {
          load:['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js']
        },
        {
            load: 'http://cdn.binaryjs.com/0/binary.min.js',
            complete: function () {
                if (!window.BinaryClient) {
                    yepnope('/static/js/lib/binary.min.js');
                }
            }
        } ,
        {
            load: '/static/js/lib/hopscotch-0.1.2.min.js',
            complete: function () {
                if (!window.hopscotch) {
                    yepnope('/js/hopscotch-0.1.2.min.js');
                }
            }
        } ,
        {
            load: ['/static/js/lib/canvas-to-blob.min.js','//cdnjs.cloudflare.com/ajax/libs/stacktrace.js/0.5.3/stacktrace.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/underscore.string/2.3.3/underscore.string.min.js']
        } ,
        {
            load:['//d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.4.min.js','//www.youtube.com/iframe_api','/static/js/lib/elastic.js']
        },
        {
            load:['//d2oh4tlt9mrke9.cloudfront.net/Record/js/sessioncam.js']
        }
    ]);


};