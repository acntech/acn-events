'use strict';

angular.module('acnfagkveldApp')
  .controller('AddCtrl', function ($scope, registrationService) {

    $scope.registration = {
      person: {}
    };

    $scope.create = function (registration) {
      $scope.error = null;
      registrationService
        .create(registration)
        .then(
        function (success) {
          console.log(success); //todo: redirect to "registered" page
        },
        function (error) {
          $scope.error = error.data || error;
        }
      );
    };
  });
