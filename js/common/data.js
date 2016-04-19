(function () {
    'use strict';

    function data($http, $q, authorization, baseServiceUrl) {

        function get(url, queryParams) {
            var defered = $q.defer();

            var authHeader = authorization.getAuthorizationHeader();

            $http.get(baseServiceUrl + '/' + url, { params: queryParams, headers: authHeader })
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    defered.reject(error);
                });

            return defered.promise;
        }

        function post(url, postData) {
            var defered = $q.defer();

            var authHeader = authorization.getAuthorizationHeader();

            $http.post(baseServiceUrl + '/' + url, postData, { headers: authHeader })
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    defered.reject(error);
                });

            return defered.promise;
        }

        function put(url, data) {
            var defered = $q.defer();

            var authHeader = authorization.getAuthorizationHeader();

            $http.put(baseServiceUrl + '/' + url, data, { headers: authHeader})
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    defered.reject(error);
                });

            return defered.promise;
        }

        return {
            get: get,
            post: post,
            put: put
        };
    }

    angular
        .module('issueTrackingSystem.services')
        .factory('data', ['$http', '$q', 'authorization', 'baseServiceUrl', data]);
}());