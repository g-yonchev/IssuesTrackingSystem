(function () {
    'use strict';

    function labelsService(data) {

        function getAllByFilter(filter) {
            return data.get('labels/?filter=' + filter);
        }

        return {
            getAllByFilter: getAllByFilter
        }
    }

    angular
        .module('issueTrackingSystem.services')
        .factory('labelsService', ['data', labelsService]);
}());