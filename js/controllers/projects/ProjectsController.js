(function () {
    'use strict';

    function ProjectsController($scope, identity, projectsService) {
        $scope.identity = identity;

        projectsService.getAll()
            .then(function (data) {
                $scope.projects = data;
            });
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('ProjectsController', ['$scope', 'identity', 'projectsService', ProjectsController])
}());