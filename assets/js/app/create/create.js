'use strict';
(function (ng, app) {
    ng.module(app, [
            'ui.router',
            'templates-app'    ,
            'sokratik.lab.presentation.services',
            'sokratik.atelier.edit',
            'sokratik.atelier.record'    ,
            'sokratik.atelier.player'
        ])

    /**
     * Each section or module of the site can also have its own routes. AngularJS
     * will handle ensuring they are all available at run-time, but splitting it
     * this way makes each module more "self-contained".
     */
        .config(['$stateProvider', function config($stateProvider) {

            $stateProvider.state('sokratik.create', {
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
                        } else {
                            return presentationService.createNew();
                        }

                    }]
                }
            });
        }])

    /**
     * And of course we define a controller for our route.
     */
        .controller('CreateCtrl', ['$state', 'presentation', function ($state, presentation) {
            $state.go('sokratik.edit.activate', {templateName: 'title', presentationId: presentation._id, page: 0, images: 0});

        }]);
})(angular, 'sokratik.lab.create');