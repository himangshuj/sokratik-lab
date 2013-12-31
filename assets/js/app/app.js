(function (ng, app) {
    'use strict';
    ng.module(app, ['ui.router',
            'sokratik.lab.home',
            'sokratik.lab.login',
            'sokratik.lab.create'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function ($stateProvider, $urlRouterProvider, $locationProvider) {
                $urlRouterProvider.otherwise('/home');
               // $locationProvider.html5Mode(true);
                $stateProvider.state('root', {
                    abstract: true,
                    resolve: {
                        loggedUser: ['userService', function (userService) {
                            return userService.loggedUser();
                        }],
                        logged: ['loggedUser', '$rootScope', function (loggedUser, $rootScope) {
                            $rootScope.logged = !_.isEqual(loggedUser, 'null');
                            return $rootScope.logged;
                        }]

                    },
                    views: {
                        'root': {
                            template: '<div ui-view ="main"/>'
                        }
                    }

                });

            }])

        .controller('AppCtrl', ['$rootScope', function ($rootScope) {
            $rootScope.showCase = true;
        }]);

})(angular, 'sokratik.lab.app');