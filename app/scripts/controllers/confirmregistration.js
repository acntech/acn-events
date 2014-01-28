'use strict';

angular.module('acnEventsApp')
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

        $scope.ok = function () {
            console.log('confirm ok()');
            $scope.modal.close();
        };

        registrationService.confirm($routeParams.id).then(function () {
                $state.go('confirm.success');
            },
            function (error) {
                $scope.error = error.data || error;
                $state.go('confirm.error');
            });

    });
