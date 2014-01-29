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
            .state('registered', {
                controller: 'RegistrationCtrl',
                views: {
                    "marketing": { templateUrl: "views/marketing.registration.success.html", controller: 'RegistrationCtrl' }
                }
            })
            .state('confirmed', {
                url: "/registrations/{id}/confirm",
                controller: 'ConfirmRegistrationCtrl',
                views: {
                    "marketing": { templateUrl: "views/marketing.confirmation.html", controller: 'ConfirmRegistrationCtrl' }
                }
            })
            .state('unregistered', {
                url: "/registrations/{id}/unregister",
                controller: 'DeleteRegistrationCtrl',
                views: {
                    "marketing": { templateUrl: "views/marketing.confirmation.html", controller: 'DeleteRegistrationCtrl' }
                }
            })
            .state('otherwise', {
                url: "*path",
                controller: 'RegistrationCtrl',
                views: {
                    "registerform": { templateUrl: "views/registerform.html", controller: 'RegistrationCtrl' },
                    "marketing": { templateUrl: "views/marketing.register.teaser.html", controller: 'RegistrationCtrl' }
                }
            })
    });