'use strict';

angular.module('acnEventsApp')
    .controller('ConfirmRegistrationCtrl', function ($scope, $stateParams, registrationService, $state) {
        console.log("Confirming registration with id: " + $stateParams.id)
        registrationService.confirm($stateParams.id).then(function () {
                $scope.error = null;
                console.log("Confirmed successfully registration with id: " + $stateParams.id)
            },
            function (error) {
                $scope.error = error.data || error;
                console.error(error)
                $state.go('confirm-error');
            });
    });
