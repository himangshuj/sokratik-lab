window.onload = function () {
    yepnope.errorTimeout = 2000;
    yepnope([

        {
            load: 'http://cdn.binaryjs.com/0/binary.min.js',
            complete: function () {
                if (!window.BinaryClient) {
                    yepnope('/static/js/lib/binary.min.js');
                }
            }
        } ,
        {
            load: '/static/js/hopscotch-0.1.2.min.js',
            complete: function () {
                if (!window.hopscotch) {
                    yepnope('/js/hopscotch-0.1.2.min.js');
                }
            }
        } ,


    ]);


};