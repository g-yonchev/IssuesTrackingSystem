(function () {
    'use strict';

    function IssueDetailsController($scope, $routeParams, issuesService) {
        var issueId = $routeParams.id;

        issuesService.getById(issueId)
            .then(function (issue) {
                var labels = [];

                issue.Labels.forEach(function (label) {
                    labels.push(label.Name);
                });

                labels = labels.join(', ');
                issue.Labels = labels;

                $scope.issue = issue;
            });

        issuesService.getCommentsById(issueId)
            .then(function (comments) {
                $scope.comments = comments;
            });

        $scope.changeIssueStatus = function (issueId, statusId) {
            issuesService.changeStatus(issueId, statusId)
                .then(function (response) {
                    console.log('issue change status response');
                    console.log(response);
                },function (error) {
                    console.log('issue change status error');
                    console.log(error);
                });
        };

        $scope.addComment = function (issueId, commentContent) {
            issuesService.addComment(issueId, { Text: commentContent})
                .then(function (response) {
                    console.log('issue comment add response');
                    console.log(response);
                },function (error) {
                    console.log('issue comment add error');
                    console.log(error);
                });
        };
    }

    angular
        .module('issueTrackingSystem.controllers')
        .controller('IssueDetailsController', ['$scope', '$routeParams', 'issuesService', IssueDetailsController])
}());