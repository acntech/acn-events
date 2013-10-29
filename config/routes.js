module.exports = function (app) {
    var registrationCtrl = require('../app/controllers/registration'),
        actions = require('./actions'),
        express = require('express'),
        config = require('./config'),
        baseUrl = "/api/event/registrations";

    // Authentication
    var auth = express.basicAuth(function (user, pass, callback) {
        var result = (user === config.autUser && pass === config.autPass);
        callback(null /* error */, result);
    });

    // Public routes
    app.get(baseUrl + '/:id', registrationCtrl.readRegistration());
    app.post(actions.register.route, registrationCtrl.register(baseUrl));
    app.delete(actions.unregister.route, registrationCtrl.unregister());
    app.post(actions.confirm.route, registrationCtrl.confirm());

    // Private routes
    app.get('/api/helloworld', auth, registrationCtrl.helloWorld());
    app.get(baseUrl, auth, registrationCtrl.readAllRegistrations());
    app.post(actions.checkIn.route, auth, registrationCtrl.checkIn());
};
