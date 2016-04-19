(function () {
    'use strict';

    function ProjectCreateController($scope, $location, notify, projectsService, usersService, labelsService) {

        usersService.getAll()
            .then(function (response) {
                $scope.users = response;
            });

        $scope.createProject = function (newProject) {
            var projectKey = '';

            newProject.Name.split(' ').forEach(function (element) {
                projectKey += element.charAt(0);
            });
            newProject.ProjectKey = projectKey;

            var label = $('#label').val();
            newProject.Labels =[{Name: label}];

            var priorities = newProject.Priorities.split(',');

            newProject.Priorities = [];
            priorities.forEach(function (el) {
                el = el.trim();
                newProject.Priorities.push({Name: el});
            });

            projectsService.create(newProject)
                .then(function (createdProject) {
                    $location.path('projects/' + createdProject.Id);
                    notify.showInfo('Successful created project!');
                });
        };

        $scope.filterLabels = function (label) {
            labelsService.getAllByFilter(label)
                .then(function (labels) {
                    var labelsNames = [];

                    labels.forEach(function (el) {
                        labelsNames.push(el.Name);
                    });

                    $(".autocomplete").autocomplete({
                        source: labelsNames
                    });
                })
        };
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('ProjectCreateController', ['$scope', '$location', 'notify', 'projectsService', 'usersService', 'labelsService', ProjectCreateController])
}());