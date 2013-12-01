'use strict';

var app = angular.module('acnEventsApp')
app.controller('DynamicEventFrontpageController', function ($scope, $modal, registrationService, $timeout, $routeParams, resourceService) {


	$scope.event = resourceService.eventResource.get({id: $routeParams.uri})

	var reset = function () {
		$scope.registration = {
			person: {}
		};
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
		}, 10000);//TODO: replace with socket.io
	};
	poll();

	$scope.ok = function () {
		$scope.modal.close();
	};

	$scope.create = function (registration) {
		$scope.error = null;
		registrationService
			.create(registration)
			.then(
			function (success) {
				console.log(success); //todo: redirect to "registered" page
				$scope.modal = $modal.open({
					templateUrl: 'successModal.html',
					backdrop: true,
					keyboard: true,
					backdropClick: true,
					scope: $scope
				});

//          $scope.modal.result.then(reset, reset);
			},
			function (error) {
				$scope.error = error.data || error;
			}
		);
	};

	reset();
});
