(function (ng, app) {
    ng.module(app, [
            'ui.router',
            'templates-lab',
            'sokratik.lab.user.services',
            'sokratik.lab.presentation.services'
        ])

    /**
     * Each section or module of the site can also have its own routes. AngularJS
     * will handle ensuring they are all available at run-time, but splitting it
     * this way makes each module more "self-contained".
     */
        .config(['$stateProvider', function config($stateProvider) {

            $stateProvider.state('list', {
                url: '/list',
                views: {
                    main: {
                        controller: 'ListCtrl',
                        templateUrl: 'list/list.tpl.html'
                    }
                },
                resolve: {
                    presentations: ['presentationService', function (presentationService) {
                        //noinspection JSValidateTypes
                        return presentationService.presentations();

                    }]
                },
                parent: 'root'
            });
        }])

    /**
     * And of course we define a controller for our route.
     */
        .controller('ListCtrl', ['$scope', 'presentations', '$rootScope', '$http', '$state', '$sce',
            function ($scope, presentations, $rootScope, $http, $state, $sce) {
                $rootScope.showCase = false;
                $scope.presentations = presentations;
                $scope.colors = ["color-green", "color-yellow", "color-purple"];
                $scope.len = $scope.colors.length;
                $scope.deletePresentation = function (presentationId) {
                    $http.delete('/presentation/' + presentationId).success(function (resp) {
                        $state.transitionTo($state.current, {}, {
                            reload: true, inherit: true, notify: true
                        });
                    });
                };
                $rootScope.presentationMode = false;
                $rootScope.navigationMode = true;
                $rootScope.homeScreen = false;
                $rootScope.audioLocation = $sce.trustAsResourceUrl('//s3-ap-southeast-1.amazonaws.com/demo-answers-sg/Lantern/Happy-minute.mp3');
            }]);
})(angular, 'sokratik.lab.list');