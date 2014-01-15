describe('AppCtrl', function () {
    'use strict';
    describe('initialisation', function () {
        var HomeCtrl, $location, $scope;

        beforeEach(module('sokratik.lab.home'));

        beforeEach(inject(function ($controller, _$location_, $rootScope) {
            $location = _$location_;
            $scope = $rootScope.$new();
            HomeCtrl = $controller('HomeCtrl', { $location: $location, $scope: $scope, logged: true});
        }));

        it('initialization test', inject(function ($state) {
            expect(HomeCtrl).toBeTruthy();
            expect($scope.homeScreen).toBeTruthy();
        }));
    });


});