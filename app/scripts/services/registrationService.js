'use strict';

angular.module('acnEventsApp')
  .factory('registrationService', function ($resource, $q) {
    var eventResource = $resource('/api/event/');
    var registrationResource = $resource('/api/event/registrations/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
    var confirmResource = $resource('/api/event/registrations/:id/confirm', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    return {
      count: function () {
        var deferred = $q.defer();
        eventResource.get(function (result) {
          deferred.resolve(result.countConfirmed);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      create: function (registration) {
        return registrationResource.save(registration).$promise;
      },
      confirm: function (id) {
        return confirmResource.save({
          id: id
        }).$promise;
      },
      delete: function (id) {
        return registrationResource.delete({
          id: id
        }).$promise;
      }
    };
  });
