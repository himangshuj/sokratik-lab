'use strict';
describe('userService', function () {
    var presentationService, httpBackend;
    describe('initialization', function () {
        beforeEach(function () {
            module('sokratik.lab.presentation.services');
        });
        var postCalls = 0;
        beforeEach(inject(function (_presentationService_, $httpBackend) {
            presentationService = _presentationService_;
            httpBackend = $httpBackend;
            httpBackend.when('GET', '/presentations').respond([
                {id: 'id', title: 'title', subtitle: 'subtitle'} ,
                {id: 'id2', title: 'title2', subtitle: 'subtitle2'}
            ]);
            httpBackend.when('POST', '/presentation').respond(function () {
                postCalls++;
                return [200, {
                    id: 'id', title: 'title', subtitle: 'subtitle'
                }];
            });

        }));
        it('fetchPresentations', function () {
            presentationService.presentations().then(function (resp) {
                expect(resp.length).toBe(2);
            });
            httpBackend.flush();

        });
        it('createPresentation', function () {
            presentationService.createNew().then(function (resp) {
                expect(resp.id).toBe('id');
            });
            httpBackend.flush();
            expect(postCalls).toBe(1);

        });


    });

});