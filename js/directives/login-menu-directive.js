(function() {
    'use strict';

    function loginMenu() {
        return {
            restrict: 'A',
            templateUrl: 'templates/directives/login-menu-directive.html'
        }
    }

    angular
        .module('issueTrackingSystem.directives')
        .directive('loginMenu', [loginMenu]);
}());