'use strict';

angular.module('acnEventsApp', [
        'ngResource',
        'ngRoute',
        'ui.bootstrap',
        'ui.bootstrap.modal',
        'ui.router'
    ])
    .config(function ($stateProvider, $routeProvider) {
        $stateProvider
            .state('index', {
                url: "",
                controller: 'RegistrationCtrl',
                views: {
                    "registerform": { templateUrl: "views/registerform.html", controller: 'RegistrationCtrl' },
                    "marketing": { templateUrl: "views/marketing.register.html", controller: 'RegistrationCtrl' }
                }
            })
            .state('registered', {
                controller: 'RegistrationCtrl',
                views: {
                    "marketing": { templateUrl: "views/marketing.registered.html", controller: 'RegistrationCtrl' }
                }
            })
            .state('confirm', {
                url: "/registrations/{id}/confirm",
                controller: 'ConfirmRegistrationCtrl',
                views: {
                    "marketing": { templateUrl: "views/marketing.confirm.success.html", controller: 'ConfirmRegistrationCtrl' }
                }
            })
            .state('confirm-error', {
                views: {
                    "marketing": { templateUrl: "views/marketing.confirm.error.html" }
                }
            })
    });
/*
 .config(function ($routeProvider) {
 $routeProvider
 .when('/', {
 templateUrl: 'views/main.html',
 controller: 'RegistrationCtrl'
 })
 .when('/registrations/registered', {
 templateUrl: 'views/confirm-registered.html',
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
 });*/
