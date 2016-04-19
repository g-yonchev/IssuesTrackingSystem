(function() {
    'use strict';

    function allProjects() {
        return {
            restrict: 'A',
            templateUrl: 'templates/directives/all-projects-directive.html'
        }
    }

    angular
        .module('issueTrackingSystem.directives')
        .directive('allProjects', [allProjects]);
}());