'use strict';

var acnfagkveldApp = angular.module('acnfagkveldApp', [
    'ngResource',
    'ui.bootstrap',
    'ui.bootstrap.modal'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'RegistrationCtrl'
      })
      .when('/registrations/:id/confirm', {
        templateUrl: 'views/main.html',
        controller: 'ConfirmRegistrationCtrl'
      })
      .when('/registrations/:id/unregister', {
        templateUrl: 'views/main.html',
        controller: 'DeleteRegistrationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
