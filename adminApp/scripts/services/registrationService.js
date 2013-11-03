'use strict';

app.factory('registrationService', function ($resource, $q) {
    var registrationResource = $resource('/api/event/registrations/');

    return {
        readAll: function () {
            var deferred = $q.defer();

            registrationResource.query(function (result) {
                deferred.resolve(result);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }
    };
});
