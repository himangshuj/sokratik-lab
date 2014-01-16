(function (ng, app) {
    ng.module(app, [
            'ui.router',
            'sokratik.lab.presentation.services',
            'templates-lab'
        ])

    /**
     * Each section or module of the site can also have its own routes. AngularJS
     * will handle ensuring they are all available at run-time, but splitting it
     * this way makes each module more "self-contained".
     */
        .config(['$stateProvider', function config($stateProvider) {

            $stateProvider.state('share', {
                url: '/share/:presentationId',
                resolve: {
                    presentation: ['$stateParams', 'presentationService', function ($stateParams, presentationService) {
                        return presentationService.fetchPresentation($stateParams.presentationId);


                    }]
                },
                views: {
                    main: {
                        controller: 'ShareCtrl',
                        templateUrl: 'share/share.tpl.html'
                    }
                },
                parent: 'root'
            });
        }])

    /**
     * And of course we define a controller for our route.
     */
        .controller('ShareCtrl', ['$rootScope', function ($rootScope) {
            $rootScope.presentationMode = false;
            $rootScope.navigationMode = true;
            $rootScope.homeScreen = true;
        }]);
})(angular, 'sokratik.lab.share');