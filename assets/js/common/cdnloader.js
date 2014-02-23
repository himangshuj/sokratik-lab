window.onload = function () {
    yepnope.errorTimeout = 2000;
    yepnope([
        {
            load: 'http://cdn.binaryjs.com/0/binary.min.js',
            complete: function () {
                if (!window.BinaryClient) {
                    yepnope('/js/lib/binary.min.js');
                }
            }
        } ,
        {
            load: '/js/lib/hopscotch-0.1.2.min.js',
            complete: function () {
                if (!window.hopscotch) {
                    yepnope('/js/hopscotch-0.1.2.min.js');
                }
            }
        } ,
        {
            load: ['/js/lib/canvas-to-blob.min.js','//cdnjs.cloudflare.com/ajax/libs/stacktrace.js/0.5.3/stacktrace.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/underscore.string/2.3.3/underscore.string.min.js']
        } ,
        {
            load:['//d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.4.min.js','//www.youtube.com/iframe_api','/js/lib/elastic.js']
        },
        {
            load:['//d2oh4tlt9mrke9.cloudfront.net/Record/js/sessioncam.js']
        }
    ]);


};