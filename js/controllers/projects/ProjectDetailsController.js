(function () {
    'use strict';

    function ProjectDetailsController($scope, $routeParams, projectsService, issuesService, usersService) {
        var projectId = $routeParams.id;

        projectsService.getById(projectId)
            .then(function (project) {
                var labels = [];
                var priorities = [];

                project.Labels.forEach(function (label) {
                    labels.push(label.Name);
                });
                project.Priorities.forEach(function (priority) {
                    priorities.push(priority.Name);
                });

                labels = labels.join(', ');
                priorities = priorities.join(', ');

                project.Labels = labels;
                project.Priorities = priorities;

                $scope.project = project;
            });

        $scope.currentPage = 1;
        $scope.pageSize = 3;

        usersService.me()
            .then(function (currentUser) {
                var filter = '?pageSize=' + $scope.pageSize + '&pageNumber=' + $scope.currentPage + '&filter=Project.Id ==' + projectId;

                if (!currentUser.isAdmin) {
                    filter += ' and Assignee.Username == "' + currentUser.Username + '"';
                }

                issuesService.filterIssues(filter)
                    .then(function (data) {
                        $scope.issues = data.Issues;
                        $scope.totalPages = data.TotalPages;
                    });

                $scope.selectedPage = function (pageNumber) {
                    pageNumber++;
                    $scope.currentPage = pageNumber;

                    var filter = '?pageSize=' + $scope.pageSize + '&pageNumber=' + $scope.currentPage + '&filter=Project.Id ==' + projectId;

                    if (!currentUser.isAdmin) {
                        filter += ' and Assignee.Username == "' + currentUser.Username + '"';
                    }

                    issuesService.filterIssues(filter)
                        .then(function (data) {
                            $scope.issues = data.Issues;
                            $scope.totalPages = data.TotalPages;
                        });
                };
            });
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('ProjectDetailsController', ['$scope', '$routeParams', 'projectsService', 'issuesService', 'usersService', ProjectDetailsController])
}());