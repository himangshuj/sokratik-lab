(function (ng, app) {
    'use strict';
    ng.module(app, [
            'ui.router',
            'templates-app',
            'sokratik.lab.user.services'
        ])
        .config(function config($stateProvider) {
            $stateProvider.state('login', {
                url: '/login',
                views: {
                    root: {
                        controller: 'LoginCtrl',
                        templateUrl: 'login/login.tpl.html'
                    }
                }
            });
        })

    /**
     * And of course we define a controller for our route.
     */
        .controller('LoginCtrl', ['$scope', 'userService', '$state', function ($scope, userService, $state) {
            $scope.showCase = true;
            $scope.login = function () {
                userService.login($scope.email, $scope.password).then(function (resp) {
                    $state.go('list');
                });
            };
            $scope.createUser = function () {
                userService.createUser($scope.email, $scope.password).then(function (resp) {
                    $state.go('home');
                });
            };
        }]);
})(angular, 'sokratik.lab.login');