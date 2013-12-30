'use strict';
describe('userService', function () {
    var userService, httpBackend;
    describe('initialization', function () {
        beforeEach(function () {
            module('sokratik.lab.user.services');
        });
        beforeEach(inject(function (_userService_, $httpBackend) {
            userService = _userService_;
            httpBackend = $httpBackend;
            httpBackend.when('POST', '/users/login').respond(function (method, url, data) {
                    data = JSON.parse(data);
                    expect(data.email).toBeDefined();
                    expect(data.password).toBeDefined();
                    return [200, _.isEqual(data.email, data.password) ? data : null];
                }
            );
            httpBackend.when('POST', '/users/create').respond(function (method, url, data) {
                    data = JSON.parse(data);
                    expect(data.email).toBeDefined();
                    expect(data.password).toBeDefined();
                    return [200, _.extend(data, {password: 'encrypted'})];
                }
            );
            httpBackend.when('GET', '/users/me').respond({ email:"loggedUser"
                }
            );
        }));
        it('logIn', function () {
            userService.login('user', 'pass').then(function (resp) {
                expect(resp).toBeNull();
            });
            httpBackend.flush();
            userService.login('user', 'user').then(function (resp) {
                expect(resp.email).toBe('user');
            });
            httpBackend.flush();
        });
        it('createUser', function () {
            userService.createUser('user', 'pass').then(function (resp) {
                expect(resp.email).toBe('user');
                expect(resp.password).toBe('encrypted');
            });
            httpBackend.flush();
        });
        it('loggedUser',function(){
            userService.loggedUser().then(function (resp) {
                expect(resp.email).toBe('loggedUser');
            });
            httpBackend.flush();
        });

    });

});