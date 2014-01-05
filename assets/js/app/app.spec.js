describe('AppCtrl', function () {
    describe('isCurrentUrl', function () {
        var AppCtrl, $location, $scope;

        beforeEach(module('sokratik.lab.app'));

        beforeEach(inject(function ($controller, _$location_, $rootScope) {
            $location = _$location_;
            $scope = $rootScope.$new();
            AppCtrl = $controller('AppCtrl', { $location: $location, $scope: $scope });
        }));

        it('initialization test', inject(function ($urlRouter) {
            $scope.$emit('$locationChangeSuccess');
            expect(AppCtrl).toBeTruthy();
            expect($location.path()).toBe('/home');
        }));
    });
});