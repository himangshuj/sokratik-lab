ddescribe('HomeCtrl', function () {
    'use strict';
    describe('initialisation', function () {
        var ShareCtrl, $location, $scope;

        beforeEach(module('sokratik.lab.share'));

        beforeEach(inject(function ($controller, _$location_, $rootScope) {
            $location = _$location_;
            $scope = $rootScope.$new();
            ShareCtrl = $controller('ShareCtrl', { $location: $location, $scope: $scope, logged: true,
                presentation: {_id: 'presentationId', presentationData: [
                    {keyVals: {title: 'title'}}
                ]}});
        }));

        it('initialization test', inject(function ($state) {
            expect(ShareCtrl).toBeTruthy();
            expect($scope.homeScreen).toBeTruthy();
            expect($scope.presentationId).toBe('presentationId');
        }));
    });


});