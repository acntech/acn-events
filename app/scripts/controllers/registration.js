'use strict';

angular.module('acnEventsApp')
    .controller('RegistrationCtrl', function ($scope, $modal, registrationService, $timeout, $location, $state) {

        var reset = function () {
            $scope.registration = {
                person: {}
            };
            if ($scope.registrationForm) {
                $scope.registrationForm.$pristine = true;
            }
        };


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
            $scope.modal.close();
        };

        $scope.create = function (registration) {
            $scope.error = null;
            $state.go('registered');
        };

        reset();
    });
