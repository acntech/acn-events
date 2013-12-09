'use strict';

// import the moongoose helper utilities
var config = require('../../../config/config');
var mailer = require('../../../config/email');

describe('config: email', function () {

  beforeEach(function () {
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'test';
    }
    if (!String.prototype.endsWith) {
      String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };
    }
  });

  it('#sendRegisteredMail()', function (done) {

    var id = 123;
    var name = 'Accenture fagkveld admin';
    var email = 'test@example.com';
    var phone = '12345678';

    mailer.sendRegisteredMail(id, name, email, phone, function (err, responseStatus, html, text) {
      expect(err).toBeNull();

      expect(responseStatus).toBeDefined();
      expect(responseStatus).toBeTruthy();
      expect(responseStatus).toContain('OK');

      expect(text).toContain('Vi holder av plass til deg hvis du bekrefter din deltakelse');
      expect(text).toContain('/#/registrations/' + id);

      expect(html).toContain('Vi holder av plass til deg hvis du bekrefter din deltakelse');
      expect(html).toContain('<a href="' + config.frontendHost + '/#/registrations/' + id + '/confirm">');
      done();
    });
  });

  it('#sendUnRegisteredMail()', function (done) {

    var id = 123;
    var name = 'Accenture fagkveld admin';
    var email = 'test@example.com';
    var phone = '12345678';

    mailer.sendUnRegisteredMail(id, name, email, phone, function (err, responseStatus, html, text) {
      expect(err).toBeNull();

      expect(responseStatus).toBeDefined();
      expect(responseStatus).toBeTruthy();
      expect(responseStatus).toContain('OK');

      expect(text).toContain('Du er nå avregistrert');
      expect(text).toContain(phone);

      expect(html).toContain('Du er nå avregistrert');
      expect(html).toContain(phone);
      done();
    });
  });
});
