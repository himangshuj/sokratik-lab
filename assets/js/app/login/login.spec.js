describe('LoginCtrl', function () {
    'use strict';
    var dummyUserService = {
        login: function () {
            return {then: function (fn) {
                fn({message: 'success'});
            } };
        },
        createUser: function () {
            return {then: function (fn) {
                fn({message: 'success'});
            } };
        }
    };
    var LoginCtrl, $state, $scope;
    beforeEach(module('sokratik.lab.login'));

    beforeEach(inject(function ($controller, _$location_, $rootScope, _$state_) {
        $scope = $rootScope.$new();
        $state = _$state_;
        LoginCtrl = $controller('LoginCtrl', {  $scope: $scope,
            userService: dummyUserService, $state: $state });
        spyOn($state, 'go');
        $scope.loginForm = {};
        spyOn(dummyUserService, 'login').andCallThrough();
        spyOn(dummyUserService, 'createUser').andCallThrough();


    }));

    describe('initialisation', function () {

        it('initialization test', inject(function () {
            expect(LoginCtrl).toBeTruthy();
            expect($scope.submit).toBeDefined();

        }));

    });
    describe('login tests', function () {
        it('login check login args', function () {
            $scope.email = "email";
            $scope.password = "password";
            $scope.submit();
            expect(dummyUserService.login).not.toHaveBeenCalled();
            $scope.loginForm.$valid = true;
            $scope.submit();
            expect(dummyUserService.login).toHaveBeenCalledWith('email', 'password');
            expect($state.go).toHaveBeenCalledWith('list');
        });
    });

    describe('create user tests', function () {
        it('login check login args', function () {
            $scope.email = "email";
            $scope.password = "password";
            $scope.isSignupPage = true;
            $scope.loginForm.$valid = true;
            $scope.submit();
            expect(dummyUserService.createUser).toHaveBeenCalledWith('email', 'password');
            expect($state.go).toHaveBeenCalledWith('home');
        });
    });
});