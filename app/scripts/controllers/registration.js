'use strict';

angular.module('acnEventsApp')
    .controller('RegistrationCtrl', function ($scope, registrationService, $timeout, $state) {
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

        $scope.create = function (registration) {
            console.log("Handling new registration: ")
            console.log(registration)
            registrationService.create(registration).then(
                function () {
                    $scope.error = "";
                    console.log("Registration successfully stored");
                    $state.go('registered');
                },
                function (error) {
                    console.log("Registration failed: ");
                    console.log(error)
                    $scope.error = error.data || error;
                }
            );
        };

        reset();
    });
