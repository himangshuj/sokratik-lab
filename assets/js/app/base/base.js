(function (ng, module) {
    ng.module(module, [
            'sokratik.lab.user.services',
            'ui.router'
        ])

        .config(['$stateProvider', function myAppConfig($stateProvider) {
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
                        template: '<div ui-view ="main" class="parent-height"/>',
                        controller: 'RootCtrl'
                    }
                }

            });
        }])
        .controller('RootCtrl', ['$rootScope', function ($rootScope) {
            $rootScope.presentationMode = false;
            $rootScope.navigationMode = true;
        }])
})(angular, "sokratik.lab.root");
