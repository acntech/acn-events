'use strict';

angular.module('acnEventsApp')
    .controller('ConfirmRegistrationCtrl', function ($scope, $stateParams, registrationService) {
        console.log("Confirming registration with id: " + $stateParams.id)
        registrationService.confirm($stateParams.id).then(
            function () {
                $scope.confirmTitle="Alt i orden";
                $scope.confirmMessage="Din registrering er bekreftet. Vi sees!";
                console.log("Confirmed successfully registration with id: " + $stateParams.id)
            },
            function (error) {
                $scope.confirmTitle="Noe gikk galt!";
                $scope.confirmMessage=error.data || error;
                console.log("Failed confirming registration with id: " + $stateParams.id + " : ")
                console.log(error)
            });
    });
