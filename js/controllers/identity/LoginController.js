(function () {
    'use strict';

    function LoginController($scope, $location, notify, identity, auth) {
        $scope.identity = identity;

        $scope.login = function (user, loginForm) {
            if (loginForm.$valid) {
                auth.login(user)
                    .then(function (success) {
                        $location.path('/');
                        location.reload();
                        notify.showInfo('Successful login!');
                    }, function (error) {
                        notify.showError(error);
                    });
            }
            else {
                notify.showError('Username and password are required fields!')
            }
        };

        $scope.logout = function () {
            auth.logout().then(function () {
                notify.showInfo('Successful logout!');
                if ($scope.user) {
                    $scope.user.email = '';
                    $scope.user.username = '';
                    $scope.user.password = '';
                }

                $scope.loginForm.$setPristine();
                $location.path('/');
            })
        }
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('LoginController', ['$scope', '$location', 'notify', 'identity', 'auth', LoginController]);
}());