'use strict';
(function (ng, app) {
    var _videoModalCtrl = ['$scope', '$modalInstance', function ($scope, $modalInstance) {
        $scope.done = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }];

    var createPresentation = _.once(function ($state, $stateParams, $modal, presentation) {
        var modalInstance = $modal.open({
            templateUrl: 'create/howto.modal.tpl.html',
            controller: _videoModalCtrl
        });
        modalInstance.result.then(function () {
            $state.go('edit', {templateName: 'title', presentationId: presentation._id, page: 0, images: 0});
        }, function () {
            $state.go('edit', {templateName: 'title', presentationId: presentation._id, page: 0, images: 0});
        });
        createPresentation = function(){
            $state.go('edit', {templateName: 'title', presentationId: presentation._id, page: 0, images: 0});
        }
    });
    ng.module(app, [
            'ui.router',
            'templates-app'    ,
            'ui.bootstrap',
            'sokratik.lab.presentation.services',
            'sokratik.lab.root',
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

                        } else {
                            return  presentationService.createNew();

                        }

                    }]
                },
                parent: 'root'
            });
        }])

    /**
     * And of course we define a controller for our route.
     */
        .controller('CreateCtrl', ['$state', '$stateParams', '$modal', 'presentation','$window',
            function ($state, $stateParams, $modal, presentation,$window) {
                $window.ga('send', 'event', 'ImportantStates', 'click', 'editStarted');
                $state.go('edit', {templateName: 'title', presentationId: presentation._id, page: 0, images: 0});
            }]);
})(angular, 'sokratik.lab.create');