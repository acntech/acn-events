'use strict';
angular.module('acnEventsApp', [
  'ngResource',
  'ngRoute',
  'ui.bootstrap',
  'ui.bootstrap.modal'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'RegistrationCtrl'
    }).when('/registrations/:id/confirm', {
      templateUrl: 'views/main.html',
      controller: 'ConfirmRegistrationCtrl'
    }).when('/registrations/:id/unregister', {
      templateUrl: 'views/main.html',
      controller: 'DeleteRegistrationCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]);
'use strict';
angular.module('acnEventsApp').factory('registrationService', [
  '$resource',
  '$q',
  function ($resource, $q) {
    var eventResource = $resource('/api/event/');
    var registrationResource = $resource('/api/event/registrations/:id', { id: '@id' }, { update: { method: 'PUT' } });
    var confirmResource = $resource('/api/event/registrations/:id/confirm', { id: '@id' }, { update: { method: 'PUT' } });
    return {
      count: function () {
        var deferred = $q.defer();
        eventResource.get(function (result) {
          deferred.resolve(result.countConfirmed);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      create: function (registration) {
        var deferred = $q.defer();
        registrationResource.save(registration, function (result) {
          deferred.resolve(result);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      confirm: function (id) {
        var deferred = $q.defer();
        console.log('confirm');
        confirmResource.save({ id: id }, function (result) {
          deferred.resolve(result);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      delete: function (id) {
        var deferred = $q.defer();
        console.log('delete');
        registrationResource.delete({ id: id }, function (result) {
          deferred.resolve(result);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      }
    };
  }
]);
'use strict';
angular.module('acnEventsApp').controller('RegistrationCtrl', [
  '$scope',
  '$modal',
  'registrationService',
  '$timeout',
  function ($scope, $modal, registrationService, $timeout) {
    var reset = function () {
      $scope.registration = { person: {} };
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
      registrationService.create(registration).then(function (success) {
        console.log(success);
        $scope.modal = $modal.open({
          templateUrl: 'successModal.html',
          backdrop: true,
          keyboard: true,
          backdropClick: true,
          scope: $scope
        });
      }, function (error) {
        $scope.error = error.data || error;
      });
    };
    reset();
  }
]);
'use strict';
angular.module('acnEventsApp').controller('ConfirmRegistrationCtrl', [
  '$scope',
  '$modal',
  '$routeParams',
  'registrationService',
  '$timeout',
  function ($scope, $modal, $routeParams, registrationService, $timeout) {
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
      $scope.modal = $modal.open({
        templateUrl: 'confirmModal.html',
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        scope: $scope
      });
    }, function (error) {
      $scope.error = error.data || error;
      $scope.modal = $modal.open({
        templateUrl: 'confirmErrorModal.html',
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        scope: $scope
      });
    });
  }
]);
'use strict';
angular.module('acnEventsApp').controller('DeleteRegistrationCtrl', [
  '$scope',
  '$modal',
  '$routeParams',
  'registrationService',
  '$timeout',
  function ($scope, $modal, $routeParams, registrationService, $timeout) {
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
    registrationService.delete($routeParams.id).then(function (success) {
      console.log(success);
      $scope.modal = $modal.open({
        templateUrl: 'unregisterModal.html',
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        scope: $scope
      });
    }, function (error) {
      $scope.error = error.data || error;
      $scope.modal = $modal.open({
        templateUrl: 'confirmErrorModal.html',
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        scope: $scope
      });
    });
  }
]);