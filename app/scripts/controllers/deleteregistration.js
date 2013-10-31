'use strict';

angular.module('acnfagkveldApp')
    .controller('DeleteRegistrationCtrl', function ($scope, $modal, $routeParams, registrationService, $timeout) {

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

        registrationService.delete($routeParams.id).then(function (success) {
                console.log(success); //todo: redirect to "registered" page
                $scope.modal = $modal.open({
                    templateUrl: 'unregisterModal.html',
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
