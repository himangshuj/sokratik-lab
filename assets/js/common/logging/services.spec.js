'use strict';
describe('logging', function () {
    var loggingService;
    describe('initialization', function () {
        beforeEach(function () {
            module('sokratik.lab.logging.services');
        });
        beforeEach(inject(function (_loggingService_, $http) {
            loggingService = _loggingService_;
            spyOn($http, 'post').andCallFake(function () {
                return {
                    success: angular.noop
                };
            });

        }));

        it('check post error', inject(function ($http) {
            loggingService.error(1);
            expect($http.post).toHaveBeenCalledWith('/log/error',1);
        }));

        it('check post info', inject(function ($http) {
            loggingService.info(1);
            expect($http.post).toHaveBeenCalledWith('/log/info',1);
        }));


    });

});