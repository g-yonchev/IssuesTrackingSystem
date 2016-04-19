(function () {
    'use strict';

    function statisticsService($http, $q, authorization, baseServiceUrl) {
        var stats;

        function getStatistics() {
            if (stats) {
                return $q.when(stats);
            }

            stats = {};

            var defered = $q.defer();
            var authHeader = authorization.getAuthorizationHeader();

            $http.get(baseServiceUrl + '/users', { headers: authHeader })
                .then(function (usersData) {
                    stats.totalUsersCount = usersData.data.length;

                    stats.adminsCount = 0;
                    stats.usersCount = 0;
                    usersData.data.forEach(function (user) {
                        if(user.isAdmin) {
                            stats.adminsCount++;
                        } else {
                            stats.usersCount++;
                        }
                    });

                    $http.get(baseServiceUrl + '/projects', { headers: authHeader })
                        .then(function (projectsData) {
                            stats.projectsCount = projectsData.data.length;

                            var maxNumber = 1111111111;
                            $http.get(baseServiceUrl + '/issues?pageSize=' + maxNumber + '&pageNumber=1&filter=', { headers: authHeader })
                                .then(function (issuesData) {
                                    stats.issuesAllCount = issuesData.data.Issues.length;

                                    stats.issuesOpenedCount = 0;
                                    stats.issuesClosedCount = 0;
                                    stats.issuesInProgressCount = 0;
                                    stats.issuesStoppedProgressCount = 0;
                                    issuesData.data.Issues.forEach(function (issue) {
                                        var status = issue.Status.Name;

                                        if (status === 'Open') {
                                            stats.issuesOpenedCount++;
                                        } else if (status === 'Closed') {
                                            stats.issuesClosedCount++;
                                        } else if (status === 'InProgress') {
                                            stats.issuesInProgressCount++;
                                        } else if (status === 'StoppedProgress') {
                                            stats.issuesStoppedProgressCount++;
                                        }
                                    });

                                    defered.resolve(stats);

                                }, function (error) {
                                    defered.reject(error);
                                });
                        }, function (error) {
                            defered.reject(error);
                        });
                }, function (error) {
                    defered.reject(error);
                });

            return defered.promise;
        }

        return {
            getStatistics: getStatistics
        }
    }

    angular
        .module('issueTrackingSystem.services')
        .factory('statisticsService', ['$http', '$q', 'authorization', 'baseServiceUrl',  statisticsService]);
}());