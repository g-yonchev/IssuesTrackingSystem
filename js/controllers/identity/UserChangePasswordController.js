(function () {
    'use strict';

    function UserChangePasswordController($scope, $location, notify, usersService) {
        usersService.me()
            .then(function (user) {
                $scope.username = user.Username;
            });

        $scope.changePassword = function (information) {
            // check passwords match
            if (information.NewPassword !== information.ConfirmPassword) {
                notify.showError('Password and confirm password do not match');
                return;
            }

            if (information.NewPassword.length < 6) {
                notify.showError('The New password must be at least 6 characters long');
                return;
            }

            usersService.changePassword(information)
                .then(function (success) {
                    notify.showInfo('Successfully changed passowrd');
                    $location.path('/');
                }, function (err) {
                    notify.showError(err.data.ModelState[Object.keys(err.data.ModelState)[0]][0]);
                });
        }
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('UserChangePasswordController', ['$scope', '$location', 'notify', 'usersService', UserChangePasswordController])
}());