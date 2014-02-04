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
                $urlRouterProvider.otherwise('/home');

                $provide.decorator("$exceptionHandler", ['$delegate', 'loggingService', '$window',
                                                         function($delegate, loggingService, $window) {
		    return function(exception, cause) {
			$delegate(exception, cause);
                        var errorMessage = exception.toString();
			var stackTrace = printStackTrace({ e: exception });
                        var errorUrl = $window.location.href;
                        var because = cause || "";

                        loggingService.log({errorMessage: errorMessage,
                                            stackTrace: stackTrace,
                                            errorUrl: errorUrl,
                                            cause: because}
                                          );
		    };
	        }]);
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
