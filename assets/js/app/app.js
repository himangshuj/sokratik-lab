(function (ng, app) {
    'use strict';
    ng.module(app, ['ui.router',
            'templates-lab',
            'sokratik.lab.root',
            'sokratik.lab.home',
            'sokratik.lab.login',
            'sokratik.lab.share',
            'sokratik.lab.create'])
        .config(['$urlRouterProvider', '$urlRouterProvider',
            function ($urlRouterProvider) {
                $urlRouterProvider.otherwise('/home');
            }])
        .run(['$rootScope', function ($rootScope) {
            $rootScope.loading = false;
            $rootScope.$on('$stateChangeStart',
                function () {
                    $rootScope.loading = true;

                });
            $rootScope.$on('$stateChangeSuccess',
                function () {
                    $rootScope.loading = false;
                });
        }])

        .controller('AppCtrl', ['$rootScope', function ($rootScope) {
            $rootScope.presentationMode = false;
            $rootScope.navigationMode = true;
        }]);

})(angular, 'sokratik.lab.app');