(function (ng, app) {
    ng.module(app, [
            'ui.router',
            'sokratik.lab.user.services',
            'sokratik.lab.list',
            'templates-lab'
        ])

    /**
     * Each section or module of the site can also have its own routes. AngularJS
     * will handle ensuring they are all available at run-time, but splitting it
     * this way makes each module more "self-contained".
     */
        .config(function config($stateProvider) {

            $stateProvider.state('home', {
                url: '/home',
                views: {
                    main: {
                        controller: 'HomeCtrl',
                        templateUrl: 'home/home.tpl.html'
                    }
                },
                parent: 'root'
            });
        })

    /**
     * And of course we define a controller for our route.
     */
        .controller('HomeCtrl', ['$scope', '$state', function HomeController($scope, $state) {

        }]);
})(angular, 'sokratik.lab.home');