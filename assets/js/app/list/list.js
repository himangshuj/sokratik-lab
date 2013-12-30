(function (ng, app) {
    ng.module(app, [
            'ui.router',
            'templates-app'    ,
            'sokratik.lab.user.services'
        ])

    /**
     * Each section or module of the site can also have its own routes. AngularJS
     * will handle ensuring they are all available at run-time, but splitting it
     * this way makes each module more "self-contained".
     */
        .config(function config($stateProvider) {

            $stateProvider.state('list', {
                url: '/list',
                views: {
                    main: {
                        controller: 'ListCtrl',
                        templateUrl: 'list/list.tpl.html'
                    }
                },
                resolve: {
                    presentations: [function () {
                        //noinspection JSValidateTypes
                        return [
                            {title: 'Add New', subtitle: '30/12/13', class: 'css', link: {css: 'linkcss'}},
                            {title: 'Created By Me', subtitle: '30/12/13', class: 'css', link: {css: 'linkcss'}}

                        ];//dummy
                    }]
                },
                parent: 'root'
            });
        })

    /**
     * And of course we define a controller for our route.
     */
        .controller('ListCtrl', ['$scope', 'presentations', '$rootScope', function ($scope, presentations, $rootScope) {
            $rootScope.showCase = false;
            $scope.presentations = presentations;
        }]);
})(angular, 'sokratik.lab.list');