module.exports = function (app) {
    var registrationCtrl = require('../app/controllers/registration');
    var actions = require('./actions');
    var baseUrl = "/api/event/registrations";

    // Read
    app.get(baseUrl + '/helloworld', registrationCtrl.helloWorld());
    app.get(baseUrl, registrationCtrl.readAllRegistrations());
    app.get(baseUrl + '/:id', registrationCtrl.readRegistration());

    // Change state
    app.post(actions.register.route, registrationCtrl.register(baseUrl));
    app.delete(actions.unregister.route, registrationCtrl.unregister());
    app.post(actions.checkIn.route, registrationCtrl.checkIn());
    app.post(actions.confirm.route, registrationCtrl.confirm());
};
