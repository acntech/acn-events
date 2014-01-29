'use strict';

angular.module('acnEventsApp')
    .controller('DeleteRegistrationCtrl', function ($scope, $stateParams, registrationService) {
        console.log("Unregistering registration with id: " + $stateParams.id)
        registrationService.delete($stateParams.id).then(
            function () {
                $scope.confirmTitle="Alt i orden!";
                $scope.confirmMessage="Du er nå avregistrert!";
                console.log("Unregistrated successfully with id: " + $stateParams.id)
            },
            function (error) {
                $scope.confirmTitle="Noe gikk galt!";
                $scope.confirmMessage=error.data || error;
                console.log("Failed unregistering registration with id: " + $stateParams.id + " : ")
                console.log(error)
            });
    });