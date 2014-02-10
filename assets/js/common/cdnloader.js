window.onload = function () {
    yepnope.errorTimeout = 5000;
    yepnope([

        {
            load: 'http://cdn.binaryjs.com/0/binary.min.js',
            complete: function () {
                if (!window.BinaryClient) {
                    yepnope('/static/js/lib/binary.min.js');
                }
            }
        }

    ]);


};