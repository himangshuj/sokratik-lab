describe('ShareCtrl', function () {
    'use strict';
    describe('initialisation', function () {
        var ShareCtrl, $location, $scope;

        beforeEach(module('sokratik.lab.share'));

        beforeEach(inject(function ($controller, _$location_, $rootScope) {
            $location = _$location_;
            $scope = $rootScope.$new();
            ShareCtrl = $controller('ShareCtrl', { pla$location: $location, $scope: $scope, logged: true,
                presentation: {_id: 'presentationId', presentationData: [
                    {keyVals: {title: 'title'}}
                ]}});
        }));

        it('initialization test', inject(function () {
            expect(ShareCtrl).toBeTruthy();
            expect($scope.homeScreen).toBeTruthy();
            expect($scope.presentationId).toBe('presentationId');
        }));
        describe('sharingTests', function () {
            it('directPlay', function () {
                expect($scope.directPlayUrl).toBe('http://lab.sokratik.com/play/presentationId');
            });
            it('embedlink', function () {
                expect($scope.iframeLink).toBe('<iframe width="420" height="315"  src="http://lab.sokratik.com/play/presentationId" frameborder="0"  allowfullscreen> </iframe>');
            });
            it('fblink', function () {
                expect($scope.fbShareLink).toBe('https://www.facebook.com/dialog/feed?app_id=412707485526849&display' +
                    '=popup&caption=title&link=http%3A%2F%2Flab.sokratik.com%2Fplay%2FpresentationId&redirect_uri=http://lab.sokratik.com');
            });
            it('google+', inject(function ($window) {
                spyOn($window,'open');
                $scope.shareGooglePlus();
                expect($window.open).toHaveBeenCalledWith( 'https://plus.google.com/share?url=http://lab.sokratik.com/play/presentationId',
                    '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
            }));
            it('twitter', function () {
                expect($scope.twitterSharelink).toBe('https://twitter.com/intent/tweet?url=http%3A%2F%2Flab.sokratik.com%2Fplay%2FpresentationId');
            });
        });

    });


});