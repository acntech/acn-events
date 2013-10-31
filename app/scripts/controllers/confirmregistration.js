'use strict';

angular.module('acnfagkveldApp')
    .controller('ConfirmRegistrationCtrl', function ($scope, $modal, $routeParams, registrationService, $timeout) {

        registrationService.count().then(function (count) {
            $scope.numRegistrations = count;
        });

        var poll = function () {
            $timeout(function () {
                registrationService.count().then(function (count) {
                    $scope.numRegistrations = count;
                });
                poll();
            }, 10000);
        };
        poll();

        console.log("confirm controller")
        registrationService.confirm($routeParams.id).then(function (success) {
                $scope.modal = $modal.open({
                    templateUrl: 'confirmModal.html',
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true
                });
            },
            function (error) {
                $scope.error = error.data || error;
                $scope.modal = $modal.open({
                    templateUrl: 'confirmErrorModal.html',
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    scope: $scope
                });
            });

    });
