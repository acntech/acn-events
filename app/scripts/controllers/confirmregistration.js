'use strict';

angular.module('acnfagkveldApp')
  .controller('ConfirmRegistrationCtrl', function ($scope, $modal, $routeParams, registrationService) {

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
