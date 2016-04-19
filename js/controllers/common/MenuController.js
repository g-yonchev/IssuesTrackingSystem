(function () {
    'use strict';

    function MenuController($scope, identity, auth) {
        $scope.identity = identity;

        if (identity.isAuthenticated()) {
            auth.isAdmin()
                .then(function (isAdmin) {
                    $scope.isAdmin = isAdmin;
                });
        }
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('MenuController', ['$scope', 'identity', 'auth', MenuController]);
}());