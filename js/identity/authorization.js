(function () {
    'use strict';

    function authorization(identity) {

        function getAuthorizationHeader() {

            if (!identity.isAuthenticated()) {
                return {};
            }

            return {
                'Authorization': 'Bearer ' + identity.getCurrentUser()['access_token']
            }
        }

        return {
            getAuthorizationHeader: getAuthorizationHeader
        }
    }

    angular
        .module('issueTrackingSystem.services')
        .factory('authorization', ['identity', authorization]);
}());