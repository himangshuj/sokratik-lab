'use strict';
(function (ng, app) {
    ng.module(app, [
            'ui.router',
            'templates-app'    ,
            'sokratik.lab.presentation.services',
            'sokratik.atelier.edit',
            'templates-lab'
        ])

    /**
     * Each section or module of the site can also have its own routes. AngularJS
     * will handle ensuring they are all available at run-time, but splitting it
     * this way makes each module more "self-contained".
     */
        .config(function config($stateProvider) {

            $stateProvider.state('create', {
                url: '/create/:presentationId',
                views: {
                    main: {
                        controller: 'CreateCtrl',
                        templateUrl: 'create/create.tpl.html'
                    }
                },
                resolve: {
                    presentation: ['$stateParams', 'presentationService', function ($stateParams, presentationService) {
                        if (($stateParams.presentationId || "").length > 0) {
                            return presentationService.fetchPresentation($stateParams.presentationId);
                        }else{
                            presentationService.createNew();
                        }

                    }]
                },
                parent: 'root'
            });
        })

    /**
     * And of course we define a controller for our route.
     */
        .controller('CreateCtrl', ['$scope', 'presentation', '$rootScope', function ($scope, presentation, $rootScope) {
            $rootScope.showCase = false;
            $scope.presentation = presentation;
        }]);
})(angular, 'sokratik.lab.create');