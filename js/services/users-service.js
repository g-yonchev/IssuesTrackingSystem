(function () {
    'use strict';

    function usersService(data) {

        function getAll() {
            return data.get('users');
        }

        function me() {
            return data.get('users/me');
        }

        function changePassword(information) {
            console.log(information)
            return data.post('api/account/changePassword', information);
        }

        function makeAdmin(userId) {
            var putData = { UserId : userId };

            data.put('users/makeadmin', putData)
                .then(function (data) {
                    console.log(data);
                });
        }

        return {
            getAll: getAll,
            me: me,
            changePassword: changePassword,
            makeAdmin: makeAdmin
        }
    }

    angular
        .module('issueTrackingSystem.services')
        .factory('usersService', ['data', usersService]);
}());