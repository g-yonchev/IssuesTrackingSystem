(function () {
    'use strict';

    function HomeController($scope, identity, projectsService, usersService, issuesService, statisticsService) {
        $scope.identity = identity;

        if (identity.isAuthenticated()) {
            usersService.me()
                .then(function (user) {
                    projectsService.getProjectsUserIsLead(user.Id)
                        .then(function (projects) {
                            $scope.projects = projects;
                        });
                });

            $scope.currentPage = 1;
            $scope.pageSize = 3;

            issuesService.filterMineIssues('?pageSize=' + $scope.pageSize + '&pageNumber=1&orderBy=Project.Name')
                .then(function (data) {
                    $scope.issues = data.Issues;
                    $scope.totalPages = data.TotalPages;
                });

            $scope.selectedPage = function (pageNumber) {
                pageNumber++;
                issuesService.filterMineIssues('?pageSize=' + $scope.pageSize + '&pageNumber=' + pageNumber + '&orderBy=Project.Name')
                    .then(function (data) {
                        $scope.issues = data.Issues;
                        $scope.totalPages = data.TotalPages;
                    });
            };

            statisticsService.getStatistics()
                .then(function (stats) {
                    $scope.stats = stats;
                });
        }
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('HomeController', ['$scope', 'identity', 'projectsService', 'usersService', 'issuesService', 'statisticsService', HomeController])
}());