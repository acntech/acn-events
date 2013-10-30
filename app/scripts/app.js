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
      .otherwise({
        redirectTo: '/'
      });
  });
