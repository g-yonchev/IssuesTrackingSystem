(function () {
    'use strict';

    function IssueEditController($scope, $routeParams, issuesService, projectsService, usersService) {
        var issueId = $routeParams.id;
        issuesService.getById(issueId)
            .then(function (issue) {
                $scope.issue = issue;

                var projectId = issue.Project.Id;
                projectsService.getById(projectId)
                    .then(function (project) {
                        $scope.project = project;
                    });

            });

        usersService.getAll()
            .then(function (response) {
                $scope.users = response;
            });

        $scope.editIssue = function (editedIssue, newAssigneeId) {
            var issue = {
                Title: editedIssue.Title,
                Description: editedIssue.Description,
                DueDate: editedIssue.DueDate,
                AssigneeId: newAssigneeId,
                PriorityId: editedIssue.PriorityId,
                Labes: editedIssue.Labels
            };

            issuesService.edit(issueId, issue)
                .then(function (editedIssue) {
                    console.log(editedIssue);
                });
        }
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('IssueEditController', ['$scope', '$routeParams', 'issuesService', 'projectsService', 'usersService', IssueEditController])
}());