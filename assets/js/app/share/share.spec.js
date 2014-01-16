ddescribe('HomeCtrl', function () {
    'use strict';
    describe('initialisation', function () {
        var ShareCtrl, $location, $scope;

        beforeEach(module('sokratik.lab.share'));

        beforeEach(inject(function ($controller, _$location_, $rootScope) {
            $location = _$location_;
            $scope = $rootScope.$new();
            ShareCtrl = $controller('ShareCtrl', { $location: $location, $scope: $scope, logged: true});
        }));

        it('initialization test', inject(function ($state) {
            expect(ShareCtrl).toBeTruthy();
            expect($scope.homeScreen).toBeTruthy();
        }));
    });


});