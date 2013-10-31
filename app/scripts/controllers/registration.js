'use strict';

angular.module('acnfagkveldApp')
  .controller('RegistrationCtrl', function ($scope, $modal, registrationService) {

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

    $scope.create = function (registration) {
      $scope.error = null;
      registrationService
        .create(registration)
        .then(
        function (success) {
          console.log(success); //todo: redirect to "registered" page
          $scope.modal = $modal.open({
            templateUrl: 'successModal.html',
            backdrop: true,
            keyboard: true,
            backdropClick: true
          });

//          $scope.modal.result.then(reset, reset);
        },
        function (error) {
          $scope.error = error.data || error;
        }
      );
    };

    reset();
  });