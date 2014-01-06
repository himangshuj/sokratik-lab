describe('CreateCtrl', function () {
    'use strict';
    describe('initialisation', function () {
        var CreateCtrl, $scope;

        beforeEach(module('sokratik.lab.create'));

        beforeEach(inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();
            var dummyPresentation = {data: {title: 'Add New', subtitle: '30/12/13', class: 'css', link: {css: 'linkcss'}}

            };
            CreateCtrl = $controller('CreateCtrl', {  $scope: $scope, presentation: dummyPresentation});

        }));

        it('initialization test', inject(function () {
            expect(CreateCtrl).toBeTruthy();
        }));
    });
});