(function (ng, app) {
    'use strict';
    var presentationService = function () {
        this.$get = ['$http', '$q', function ($http, $q) {

            return {
                presentations: function () {
                    var deferred = $q.defer();
                    $http.get("/presentations").success(function (data) {
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                },
                createNew: function () {
                    var deferred = $q.defer();

                    $http.post("/presentation", {}).success(function (data) {
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                },
                fetchPresentation: function (presentationId) {
                    var deferred = $q.defer();

                    $http.get("/presentation/" + presentationId).success(function (data) {
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                }
            };

        }];
    };
    ng.module(app, [], ['$provide', function ($provide) {
        $provide.provider('presentationService', presentationService);

    }]);

})(angular, 'sokratik.lab.presentation.services');