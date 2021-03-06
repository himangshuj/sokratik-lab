(function (ng, module) {
    var _videoModalCtrl = ['$scope', '$modalInstance', function ($scope, $modalInstance) {
        $scope.done = function () {
            $modalInstance.close();
        };
        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }];
    var createPresentation = function ($state, $stateParams, $modal) {
        var modalInstance = $modal.open({
            templateUrl: 'create/howto.modal.tpl.html',
            controller: _videoModalCtrl
        });
        modalInstance.result.then(function () {
        }, function () {
        });

    };
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
                    logged: ['loggedUser', '$rootScope', '$log', function (loggedUser, $rootScope) {
                        $rootScope.logged = !_.isEqual(loggedUser, 'null');
                        return $rootScope.logged;
                    }]

                },
                views: {
                    'root': {
                        templateUrl: 'base/root.tpl.html',
                        controller: 'RootCtrl'
                    }
                }

            });
        }])
        .controller('RootCtrl', ['$rootScope', '$scope', '$stateParams', '$window', '$state', '$location', '$anchorScroll', '$modal', function ($rootScope, $scope, $stateParams, $window, $state, $location, $anchorScroll, $modal) {
            $rootScope.presentationMode = false;
            $rootScope.homeScreen = false;
            $scope.walkthroughActive = false;
            $scope.goToSamples = function () {
                $state.go("home", {scroll: true}, {reload: true});
            };
            $scope.openHowToVideo = function () {
                createPresentation($state, $stateParams, $modal);
            };
            $scope.$on('variablePropagation', function (event, _page, _totalPage, _tour) {
                $scope.walkthroughActive = false;
                if (!!_tour) {
                    var tourState = _.str.words($window.hopscotch.getState(), ":");
                    var tourIndex = 0;
                    if (!!tourState && tourState[0] === _tour.id) {
                        tourIndex = _.str.words($window.hopscotch.getState(), ":")[1];
                        tourIndex = parseInt(tourIndex, 10);
                    } else {
                        tourIndex = 0;
                    }
                    var timeOut = null;
                    var totalSteps = _.size(_tour.steps);
                    $window.hopscotch.listen('show', function () {
                        tourIndex = ($window.hopscotch.getCurrStepNum() + 1) % totalSteps;
                        timeOut = _.delay(function () {
                            $window.hopscotch.endTour(false);
                        }, 5000);
                    });
                    $window.hopscotch.listen('next', function () {
                        $window.clearTimeout(timeOut);
                    });
                    $window.hopscotch.listen('prev', function () {
                        $window.clearTimeout(timeOut);
                    });
                    $scope.nextTip = function () {
                        $window.clearTimeout(timeOut);
                        $window.hopscotch.startTour(_tour, tourIndex);
                    };
                    $scope.prevTip = function () {
                        $window.clearTimeout(timeOut);
                        $window.hopscotch.startTour(_tour, Math.max(tourIndex - 2, 0));
                    };
                    if (_page === 0) {
                        if (!!$window.hopscotch.getCurrTour()) {
                            $window.hopscotch.endTour();
                        }
                        $window.hopscotch.startTour(_tour, tourIndex);
                    }
                }
                else {   //To know that this is play mode
                    $scope.hideTour = true;
                }
                $scope.page = parseInt("" + _page, 10) + 1;
                $scope.totalPage = _totalPage;
                event.stopPropagation();
            });

        }])
})(angular, "sokratik.lab.root");
