'use strict';
var acnfagkveldAdminApp = angular.module('acnfagkveldAdminApp', [
        'ngResource',
        'ngGrid'
    ]).config(function ($routeProvider) {
        $routeProvider
            .when('/registrations', {
                templateUrl: 'views/registrations.html',
                controller: 'RegCtrl'
            })
            .when('/event', {
                templateUrl: 'views/event.html',
                controller: 'EventCtrl'
            })
            .when('/settings', {
                templateUrl: 'views/settings.html',
                controller: 'SettingsCtrl'
            })
            .otherwise({
                redirectTo: '/event'
            });
    });
