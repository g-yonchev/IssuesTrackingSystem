(function () {
    'use strict';

    function dateEditFilter() {
        return function (input) {
            // check if input is date

            var monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];

            var date = new Date(input);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            return month + '/' + day + '/' + year;
        }
    }

    angular
        .module('issueTrackingSystem.filters')
        .filter('dateEditFilter', [dateEditFilter])
}());