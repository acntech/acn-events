'use strict';

app.factory('registrationService', function ($resource, $q) {
    var registrationResource = $resource('/api/event/registrations/');
    var confirmResource = $resource('/api/event/registrations/:id/confirm', {id: '@id' });

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
            console.log("confirm");
            confirmResource.save({id: id}, function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
});
