(function () {
    'use strict';

    function RegisterController($scope, $location, auth, notify) {
        $scope.register = function (user) {
            if (user.password !== user.confirmPassword) {
                notify.showError('Password and confirm password do not match');
                return;
            }

            if (user.password.length < 6) {
                notify.showError('The New password must be at least 6 characters long');
                return;
            }

            auth.register(user).then(function () {
                notify.showInfo('Successful registration!');
                $location.path('/login');
            }, function (error) {
                notify.showError(error);
            })
        }
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('RegisterController', ['$scope', '$location', 'auth', 'notify', RegisterController]);
}());