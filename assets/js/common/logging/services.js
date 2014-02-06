(function (ng, app) {
    'use strict';
    var loggingService = function () {
        this.$get = ['$http', function ($http) {
            return {
                error: function (err) {
                    $http.post('/log/error', err).success(function () {
                    });
                },
                info: function (info) {
                    $http.post('/log/info', info).success(function () {
                    });

                }
            };
        }];
    };
    ng.module(app, [], ['$provide', function ($provide) {
        $provide.provider('loggingService', loggingService);

    }]);

})(angular, 'sokratik.lab.logging.services');
