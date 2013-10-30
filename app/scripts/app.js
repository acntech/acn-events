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
        controller: 'AddCtrl'
      })
      .when('/confirm', {
        templateUrl: 'views/confirm.html'
      })
      .when('/unregister', {
        templateUrl: 'views/unregister.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
