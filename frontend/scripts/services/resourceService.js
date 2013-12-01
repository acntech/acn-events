'use strict';

angular.module('acnEventsApp').service('resourceService', function ($resource) {
	this.maxSeatsResource = $resource('/api/event/');

	this.registrationResource = $resource('/api/event/registrations/:id', {id: '@id' }, {update: {method: 'PUT'} });

	this.confirmResource = $resource('/api/event/registrations/:id/confirm', {id: '@id' }, {update: {method: 'PUT'} });

	this.eventResource = $resource('/rest/api/1/event/:id', {id: '@id' }, {update: {method: 'PUT'} });

	this.userResource = $resource('/rest/api/1/user/:id', {id: '@id' }, {update: {method: 'PUT'} });
})
