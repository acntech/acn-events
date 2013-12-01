'use strict';

angular.module('acnEventsApp', [
		'ngResource',
		'ngRoute',
		'ui.bootstrap',
		'ui.bootstrap.modal'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'RegistrationCtrl'
			})
			.when('/:uri', {
				templateUrl: 'views/dynamicMain.html',
				controller: 'DynamicEventFrontpageController'
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
