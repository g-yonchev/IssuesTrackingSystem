(function() {
    'use strict';

    function allIssues() {
        return {
            restrict: 'A',
            templateUrl: 'templates/directives/all-issues-directive.html'
        }
    }

    angular
        .module('issueTrackingSystem.directives')
        .directive('allIssues', [allIssues]);
}());