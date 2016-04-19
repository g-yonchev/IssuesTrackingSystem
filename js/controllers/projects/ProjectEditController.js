(function () {
    'use strict';

    function ProjectEditController($scope, $routeParams, $location, notify, projectsService, usersService) {
        var projectId = $routeParams.id;

        usersService.getAll()
            .then(function (response) {
                $scope.users = response;
            });


        projectsService.getById(projectId)
            .then(function (project) {
                $scope.project = project;
            });
        
        $scope.editProject = function (editedProject, newLeadId) {
            var project = {
                Name: editedProject.Name,
                Description: editedProject.Description,
                LeadId: newLeadId
            };

            projectsService.edit(projectId, project)
                .then(function (response) {
                    notify.showInfo('Successfully edited project');
                    $location.path('/projects/' + response.Id);
                });
        }
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('ProjectEditController', ['$scope', '$routeParams', '$location', 'notify', 'projectsService', 'usersService', ProjectEditController])
}());