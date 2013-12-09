'use strict';

describe('Service: registrationService', function () {

  var service;
  var $httpBackend;

  beforeEach(module('acnEventsApp'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    service = $injector.get('registrationService');
  }));

  afterEach(function () {
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('count', function () {
    it('Should return a promise which resolves to the correct value', function () {
      $httpBackend.when('GET', '/api/event').respond({
        maxSeats: 100,
        countConfirmed: 10
      });
      service.count().then(function (countConfirmed) {
        expect(countConfirmed).toBe(10);
      });
    });
  });

  describe('create', function () {
    describe('should return a promise which resolves to the correct value', function () {

      var registration = {
        person: {
          name: 'John Doe',
          email: 'test@example.com',
          phone: '12345678'
        }
      };

      it('handles success', function () {
        $httpBackend.when('POST', '/api/event/registrations').respond({});
        service.create(registration).then(function () {}, function () {
          expect(true).toBe(false);
        });
      });

      it('handles failure', function () {

        $httpBackend.whenPOST('/api/event/registrations').respond(500);
        service.create(registration).then(function () {
          expect(true).toBe(false);
        }, function () {});
      });
    });
  });

  describe('confirm', function () {

    beforeEach(function () {
      $httpBackend.when('POST', '/api/event/registrations/1/confirm').respond({});
      $httpBackend.when('POST', '/api/event/registrations/2/confirm').respond(500);
    });

    it('handles success', function () {
      service.confirm(1).then(function () {}, function () {
        expect(true).toBe(false);
      });
    });
    it('handles failure', function () {
      service.confirm(2).then(function () {
        expect(true).toBe(false);
      }, function () {});
    });
  });

  describe('delete', function () {

    beforeEach(function () {
      $httpBackend.when('DELETE', '/api/event/registrations/1').respond({});
      $httpBackend.when('DELETE', '/api/event/registrations/2').respond(500);
    });

    it('handles success', function () {
      service.delete(1).then(function () {}, function () {
        expect(true).toBe(false);
      });
    });
    it('handles failure', function () {
      service.delete(2).then(function () {
        expect(true).toBe(false);
      }, function () {});
    });
  });

});
