(function () {
    'use strict';

    function IssueCreateController($scope, $routeParams, $location, notify, issuesService, projectsService, usersService, labelsService) {
        var projectId = $routeParams.id;
        $scope.DueDate = new Date();

        usersService.getAll()
            .then(function (response) {
                $scope.users = response;
            });

        projectsService.getById(projectId)
            .then(function (project) {
                $scope.project = project;
            });

        $scope.createIssue = function (newIssue) {
            var label = $('#label').val();
            newIssue.Labels =[{Name: label}];

            newIssue.ProjectId = projectId;
            issuesService.create(newIssue)
                .then(function (createdIssue) {
                    $location.path('issues/' + createdIssue.Id);
                    notify.showInfo('Successful created issue!');
                }, function (error) {
                    console.log(error)
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
        .controller('IssueCreateController', ['$scope', '$routeParams', '$location', 'notify', 'issuesService', 'projectsService', 'usersService', 'labelsService', IssueCreateController])
}());