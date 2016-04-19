(function () {
    'use strict';

    function UsersController($scope, identity, auth, usersService) {
        usersService.me()
            .then(function (data) {
                $scope.me = data;
            });

        usersService.getAll()
            .then(function (data) {

                $scope.admins = data.filter(function (user) {
                    return user.isAdmin;
                });

                $scope.users = data.filter(function (user) {
                    return !user.isAdmin;
                });
            });

        $scope.makeAdmin = function (userId) {
            usersService.makeAdmin(userId)

        };
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('UsersController', ['$scope', 'identity', 'auth', 'usersService', UsersController])
}());