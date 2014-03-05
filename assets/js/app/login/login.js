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
                    main: {
                        controller: 'LoginCtrl',
                        templateUrl: 'login/login.tpl.html'
                    }
                },
                parent: 'root'
            });
        }])

    /**
     * And of course we define a controller for our route.
     */
        .controller('LoginCtrl', ['$scope', 'userService', '$state', function ($scope, userService, $state) {
            var login = function () {
                userService.login($scope.email, $scope.password).then(function (resp) {
                    if (_.isEqual(resp.message, "success")) {
                        $state.go('list');
                    } else {
                        $scope.errorMessage = "Invalid user id or password";
                    }
                });
            };
            var createUser = function () {
                userService.createUser($scope.email, $scope.password).then(function (resp) {
                    if (_.isEqual(resp.message, "success")) {
                        $state.go('home');
                    } else {
                        $scope.errorMessage = resp.message;
                    }
                });
            };

            $scope.submitText = 'Log In';

            $scope.$watch('isSignupPage', function () {
                $scope.submitText = $scope.isSignupPage ? 'Sign Up' : 'Log In';
            }); //

            $scope.submit = function () {
                if ($scope.loginForm.$valid) {
                    if ($scope.isSignupPage) {
                        createUser();
                    } else {
                        login();
                    }
                }
            }
        }]);
})(angular, 'sokratik.lab.login');