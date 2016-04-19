(function () {
    'use strict';

    function issuesService(data) {

        function getById(issueId) {
            return data.get('issues/' + issueId);
        }

        function getByProjectId(projectId) {
            return data.get('projects/' + projectId + '/issues');
        }

        function getCommentsById(issueId) {
            return data.get('issues/' + issueId + '/comments');
        }

        function filterMineIssues(filter) {
            return data.get('issues/me' + filter);
        }

        function filterIssues(filter) {
            return data.get('issues/' + filter);
        }

        function create(issue) {
            return data.post('issues', issue);
        }

        function edit(issueId, issue) {
            return data.put('issues/' + issueId, issue);
        }

        function changeStatus(issueId, statusId) {
            return data.put('issues/' + issueId + '/changestatus?statusid=' + statusId);
        }

        function addComment(issueId, comment) {
            return data.post('issues/' + issueId + '/comments', comment);
        }

        return {
            getById: getById,
            create: create,
            edit: edit,
            filterIssues: filterIssues,
            getByProjectId: getByProjectId,
            getCommentsById: getCommentsById,
            filterMineIssues: filterMineIssues,
            changeStatus: changeStatus,
            addComment: addComment
        }
    }

    angular
        .module('issueTrackingSystem.services')
        .factory('issuesService', ['data', issuesService]);
}());