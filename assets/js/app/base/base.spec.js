describe('RootScope', function () {
    'use strict';
    describe('initialisation', function () {
        var RootCtrl, $scope;

        beforeEach(module('sokratik.lab.root'));

        beforeEach(inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();
            RootCtrl = $controller('RootCtrl', {  $rootScope: $scope});

        }));

        it('initialization test', inject(function () {
            expect(RootCtrl).toBeTruthy();
            expect($scope.presentationMode).toBeFalsy();
        }));
    });
});