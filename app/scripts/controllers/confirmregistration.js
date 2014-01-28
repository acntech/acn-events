'use strict';

angular.module('acnEventsApp')
    .controller('ConfirmRegistrationCtrl', function ($scope, $routeParams, registrationService, $state) {
        console.log("Confirming registration")
        registrationService.confirm($routeParams.id).then(function () {
                $state.go('confirm.success');
            },
            function (error) {
                $scope.error = error.data || error;
                console.error('Error confirming registration. Error: ' + error)
                $state.go('confirm.error');
            });
    });
