'use strict';

angular.module('acnfagkveldApp')
  .controller('AddCtrl', function ($scope, registrationService) {

    $scope.registration = {
      person: {}
    };

    $scope.create = function (registration) {
      console.log("creating");
      console.log(registration);

      registrationService
        .create(registration)
        .then(
        function (success) {
          console.log("Win!");
          console.log(success);
        },
        function (error) {
          console.log("Fail =/");
          console.log(error);
        }
      );
    };
  });
