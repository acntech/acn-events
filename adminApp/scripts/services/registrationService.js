'use strict';

acnfagkveldAdminApp.factory('registrationService', function ($resource, $q) {
    var registrationResource = $resource('/api/event/registrations/');
    var confirmResource = $resource('/api/event/registrations/:id/confirm', {id: '@id' });
    var checkinResource = $resource('/api/event/registrations/:id/checkin', {id: '@id' });
    var unregisterResource = $resource('/api/event/registrations/:id/', {id: '@id' }, {
        delete_user: {
            method: 'DELETE'
        }
    });

    return {
        readAll: function () {
            var deferred = $q.defer();

            registrationResource.query(function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },
        confirm: function (id) {
            var deferred = $q.defer();
            confirmResource.save({id: id}, function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        checkin: function (id) {
            var deferred = $q.defer();
            checkinResource.save({id: id}, function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        unregister: function (id) {
            var deferred = $q.defer();
            registrationResource.delete({id: id}, function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
});
