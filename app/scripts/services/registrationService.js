'use strict';

angular.module('acnfagkveldApp')
  .factory('registrationService', function ($resource, $q) {
    var eventResource = $resource('/api/event/');
    var registrationResource = $resource('/api/event/registrations/:id', {id: '@id' }, {update: {method: 'PUT'} });

    return {
      count: function () {
        var deferred = $q.defer();
        eventResource.get(function (result) {
          deferred.resolve(result['countConfirmed']);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      create: function (registration) {
        var deferred = $q.defer();
        registrationResource.save(registration, function (result) {
          deferred.resolve(result);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      }
    };
  });
