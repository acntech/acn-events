'use strict';

var acnfagkveldApp = angular.module('acnfagkveldApp', ['ngResource'])
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
