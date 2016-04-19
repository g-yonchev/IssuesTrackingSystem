(function () {
    'use strict';

    function auth($http, $q, identity, authorization, baseServiceUrl) {

        function register(user) {
            var deferred = $q.defer();

            $http.post(baseServiceUrl + '/api/Account/Register', user)
                .then(function () {
                    deferred.resolve();
                }, function (response) {
                    var error = response.data.ModelState;
                    if (error && error[Object.keys(error)[0]][0]) {
                        error = error[Object.keys(error)[0]][0];
                    }
                    else {
                        error = response.data.ModelState[""][1];
                    }
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function login(user) {
            var deferred = $q.defer();
            user['grant_type'] = 'password';
            $http.post(baseServiceUrl + '/api/Token', 'username=' + user.username + '&password=' + user.password + '&grant_type=password', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .then(function (response) {
                    if (response.data["access_token"]) {
                        identity.setCurrentUser(response.data);
                        deferred.resolve(true);
                    }
                    else {
                        deferred.resolve(false);
                    }
                }, function (error) {
                    var err = error.data.error_description;
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();

            var headers = authorization.getAuthorizationHeader();
            $http.post(baseServiceUrl + '/api/Account/Logout', {}, { headers: headers })
                .then(function () {
                    identity.setCurrentUser(undefined);
                    deferred.resolve();
                });

            return deferred.promise;
        }

        function isAuthenticated() {
            if (identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }

        function isAdmin() {
            var deferred = $q.defer();
            var headers = authorization.getAuthorizationHeader();

            $http.get(baseServiceUrl + '/users/me', {headers: headers})
                .then(function (response) {
                    deferred.resolve(response.data.isAdmin);
                });

            return deferred.promise;
        }

        return {
            register: register,
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            isAdmin: isAdmin
        }
    }

    angular
        .module('issueTrackingSystem.services')
        .factory('auth', ['$http', '$q', 'identity', 'authorization', 'baseServiceUrl', auth]);
}());