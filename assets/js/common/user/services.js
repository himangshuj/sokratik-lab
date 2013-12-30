(function (ng, app) {
    'use strict';
    var userService = function () {
        this.$get = ['$http', '$q', function ($http, $q) {
            var auth = function (user, pass, url) {
                var deferred = $q.defer();
                $http.post(url, {email: user, password: pass})
                    .success(function (resp) {
                        deferred.resolve(resp);
                    })
                    .error(function (resp) {
                        deferred.resolve(resp);
                    });
                return deferred.promise;


            };
            return {
                login: function (user, pass) {
                    return auth(user, pass, '/users/login');
                },
                createUser: function (user, pass) {
                    return auth(user, pass, '/users/create');
                },
                loggedUser: function () {
                    var deferred = $q.defer();
                    $http.get('/users/me')
                        .success(function (resp) {
                            deferred.resolve(resp);
                        })
                        .error(function (resp) {
                            deferred.resolve(resp);
                        });
                    return deferred.promise;

                }
            };

        }];
    };
    ng.module(app, [], ['$provide', function ($provide) {
        $provide.provider('userService', userService);

    }]);

})(angular, 'sokratik.lab.user.services');