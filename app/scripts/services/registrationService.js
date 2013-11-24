'use strict';

angular.module('acnEventsApp')
  .factory('registrationService', function ($resource, $q) {
    var eventResource = $resource('/api/event/');
    var registrationResource = $resource('/api/event/registrations/:id', {id: '@id' }, {update: {method: 'PUT'} });
    var confirmResource = $resource('/api/event/registrations/:id/confirm', {id: '@id' }, {update: {method: 'PUT'} });

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
      },
      confirm: function (id) {
        var deferred = $q.defer();
        console.log("confirm");
        confirmResource.save({id: id}, function (result) {
          deferred.resolve(result);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      delete: function (id) {
        var deferred = $q.defer();
        console.log("delete");
        registrationResource.delete({id: id}, function (result) {
          deferred.resolve(result);
        }, function (error) {
          deferred.reject(error);
        });
        return deferred.promise;
      }
    };
  });
