(function (ng, app) {
    'use strict';
    ng.module(app, ['ui.router',
            'templates-lab',
            'sokratik.lab.root',
            'sokratik.lab.home',
            'sokratik.lab.login',
            'sokratik.lab.logging.services',
            'sokratik.lab.share',
            'sokratik.lab.create'])
        .config(['$urlRouterProvider', '$provide',
            function ($urlRouterProvider, $provide) {
                $urlRouterProvider.otherwise('/home/false');
                $provide.decorator("$exceptionHandler", ['$delegate', '$injector', '$window',
                    function ($delegate, $injector, $window) {
                        return function (exception, cause) {
                            $delegate(exception, cause);
                            var errorMessage = exception.toString();
                            var stackTrace = ($window.printStackTrace || ng.noop)({ e: exception });
                            var errorUrl = $window.location.href;
                            var because = cause || "";

                            $injector.get('loggingService').error({errorMessage: errorMessage,
                                    stackTrace: stackTrace,
                                    errorUrl: errorUrl,
                                    cause: because}
                            );
                        };
                    }]);
                $provide.decorator("$log", ['$delegate', '$injector','$window',
                    function ($delegate, $injector,$window) {
                        var _info = $delegate.info; //Saving the original behavior
                        $delegate.info = function (msg) {
                            $injector.get('loggingService').info({info: msg,
                                    stackTrace: ($window.printStackTrace || ng.noop)(),
                                    url: $injector.get('$location').hash()}
                            );

                        };
                        return $delegate;
                    }]);
            }])
        .run(['$rootScope', 'loggingService','$window', function ($rootScope, loggingService,$window) {
            $rootScope.loading = false;
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams) {
                    loggingService.info({event: event,
                        toState: toState,
                        fromState: fromState,
                        fromParams: fromParams
                    });
                    $rootScope.loading = true;

                });
            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    loggingService.info({event: event,
                        toState: toState,
                        fromState: fromState,
                        fromParams: fromParams
                    });
                    if($window.sessionCamRecorder) {
                        if($window.sessionCamRecorder.createVirtualPageLoad)
                            $window.sessionCamRecorder.createVirtualPageLoad(toState.name);
                    }

                    $rootScope.loading = false;
                    $window.ga('send', 'pageview', toState.url);
                });
        }])

        .controller('AppCtrl', ['$rootScope', function ($rootScope) {
            $rootScope.presentationMode = false;
            $rootScope.navigationMode = true;
        }]);
})(angular, 'sokratik.lab.app');
