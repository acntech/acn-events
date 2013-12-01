module.exports = function (app) {
  var registrationCtrl = require('../lib/controllers/registration.js');
  var eventCtrl  = require('../lib/controllers/event.js');
  var actionCtrl = require('../lib/controllers/actions.js');

  var regBaseUrl = '/api/event/registrations';
  var eventBaseUrl = '/api/event';

  // Public routes
  app.get(regBaseUrl + '/:id', registrationCtrl.readRegistration());
  app.get(eventBaseUrl, eventCtrl.countConfirmedReg());
  app.post(actionCtrl.register.route, registrationCtrl.register());
  app.delete(actionCtrl.unregister.route, registrationCtrl.unregister());
  app.post(actionCtrl.confirm.route, registrationCtrl.confirm());

  // Private routes TODO: Authentication is removed. It's not private!
  app.get(regBaseUrl,  registrationCtrl.readAllRegistrations());
  app.post(actionCtrl.checkIn.route, registrationCtrl.checkIn());
};
