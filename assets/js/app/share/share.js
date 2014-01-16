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
        .controller('ShareCtrl', ['$rootScope', 'presentation', '$scope', function ($rootScope, presentation, $scope) {
            $rootScope.presentationMode = false;
            $rootScope.navigationMode = true;
            $rootScope.homeScreen = true;
            $scope.title = presentation.presentationData[0].keyVals.title;
            $scope.presentationId = presentation._id;
            var playUrl = "http://lab.sokratik.com/#/play/" + presentation._id + "/0//0/init";
            $scope.iframeLink = "<iframe width=\"420\" height=\"315\" " +
                " src=\""+playUrl+"\" frameborder=\"0\"  allowfullscreen> </iframe>"
            $scope.fbShareLink = "https://www.facebook.com/dialog/feed?app_id=412707485526849" +
                "&display=popup&caption=" + encodeURIComponent($scope.title)+
                "&link="+encodeURIComponent(playUrl)+
                "&redirect_uri=http://lab.sokratik.com";
        }]);
})(angular, 'sokratik.lab.share');