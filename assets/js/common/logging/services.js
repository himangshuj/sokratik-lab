(function (ng, app) {
    'use strict';
    var loggingService = function () {
        this.$get = [function () {
            return {
                log: function (err) {
                    console.log(ng.toJson(err));
                    var xhr = new XMLHttpRequest();

                    xhr.open('POST', 'http://sokratiklogger.cloudapp.net/ng/', true);
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xhr.send('msg=' + encodeURIComponent(ng.toJson(err)));
                }
            };
        }];
    };
    ng.module(app, [], ['$provide', function ($provide) {
        $provide.provider('loggingService', loggingService);

    }]);

})(angular, 'sokratik.lab.logging.services');
