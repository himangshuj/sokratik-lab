describe('ListCtrl', function () {
    'use strict';
    describe('initialisation', function () {
        var ListCtrl, $location, $scope;

        beforeEach(module('sokratik.lab.list'));

        beforeEach(inject(function ($controller, _$location_, $rootScope) {
            $location = _$location_;
            $scope = $rootScope.$new();
            var dummyPresentations = {data: [
                {title: 'Add New', subtitle: '30/12/13', class: 'css', link: {css: 'linkcss'}},
                {title: 'Created By Me', subtitle: '30/12/13', class: 'css', link: {css: 'linkcss'}}

            ]};
            ListCtrl = $controller('ListCtrl', { $location: $location, $scope: $scope, presentations: dummyPresentations});

        }));

        it('initialization test', inject(function () {
            expect(ListCtrl).toBeTruthy();
            expect($scope.showCase).toBeFalsy();
            expect($scope.presentations).toBeDefined();
            expect($scope.homeScreen).toBeFalsy();
        }));
    });
});