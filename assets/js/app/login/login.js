(function (ng, app) {
    'use strict';
    ng.module(app, [
            'ui.router',
            'templates-lab',
            'sokratik.lab.user.services'
        ])
        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('login', {
                url: '/login',
                views: {
                    root: {
                        controller: 'LoginCtrl',
                        templateUrl: 'login/login.tpl.html'
                    }
                }
            });
        }])

    /**
     * And of course we define a controller for our route.
     */
        .controller('LoginCtrl', ['$scope', 'userService', '$state', function ($scope, userService, $state) {
            $scope.login = function () {
                userService.login($scope.email, $scope.password).then(function (resp) {
                    if(_.isEqual(resp.message,"success")){
                        $state.go('list');
                    }else{
                        $scope.errorMessage = "Invalid user id or password";
                    }
                });
            };
            $scope.createUser = function () {
                userService.createUser($scope.email, $scope.password).then(function (resp) {
                    if(_.isEqual(resp.message,"success")){
                        $state.go('home');
                    }else{
                        $scope.errorMessage = resp.message;
                    }
                });
            };
        }]);
})(angular, 'sokratik.lab.login');