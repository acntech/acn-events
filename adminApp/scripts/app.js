'use strict';
var acnfagkveldAdminApp = angular.module('acnfagkveldAdminApp', [
        'ngResource',
        'ngGrid'
    ]).config(function ($routeProvider) {
        $routeProvider
            .when('/registrations', {
                templateUrl: 'admin/views/registrations.html',
                controller: 'RegCtrl'
            })
            .when('/event', {
                templateUrl: 'admin/views/event.html',
                controller: 'EventCtrl'
            })
            .when('/settings', {
                templateUrl: 'admin/views/settings.html',
                controller: 'SettingsCtrl'
            })
            .otherwise({
                redirectTo: '/event'
            });
    });
