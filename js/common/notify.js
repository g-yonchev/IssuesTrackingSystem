(function () {
    'use strict';

    var notify = function (noty) {
        function showInfo(msg) {
            noty({
                    text: msg,
                    type: 'info',
                    layout: 'center',
                    timeout: 1000
                }
            );
        }

        function showError(msg, serverError) {
            // Collect errors to display from the server response
            var errors = [];
            if (serverError && serverError.error_description) {
                errors.push(serverError.error_description);
            }

            if (serverError && serverError.modelState) {
                var modelStateErrors = serverError.modelState;
                for (var propertyName in modelStateErrors) {
                    var errorMessages = modelStateErrors[propertyName];
                    var trimmedName = propertyName.substr(propertyName.indexOf('.') + 1);
                    for (var i = 0; i < errorMessages.length; i++) {
                        var currentError = errorMessages[i];
                        errors.push(trimmedName + ' - ' + currentError);
                    }
                }
            }

            if (errors.length > 0) {
                msg = msg + ":<br>" + errors.join("<br>");
            }

            noty({
                    text: msg,
                    type: 'error',
                    layout: 'center',
                    timeout: 5000
                }
            );
        }

        return {
            showInfo: showInfo,
            showError: showError
        };
    };

    angular
        .module('issueTrackingSystem.services')
        .factory('notify', ['noty', notify]);
}());