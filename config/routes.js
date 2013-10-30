module.exports = function (app) {
    var registrationCtrl = require('../app/controllers/registration'),
        eventCtrl = require('../app/controllers/event'),
        actions = require('./actions'),
        express = require('express'),
        config = require('./config'),
        regBaseUrl = "/api/event/registrations",
        eventBaseUrl = "/api/event";;

    // Authentication
    var auth = express.basicAuth(function (user, pass, callback) {
        var result = (user === config.autUser && pass === config.autPass);
        callback(null /* error */, result);
    });

    // Public routes
    app.get(regBaseUrl + '/:id', registrationCtrl.readRegistration());
    app.get(eventBaseUrl, eventCtrl.countConfirmedReg());
    app.post(actions.register.route, registrationCtrl.register());
    app.delete(actions.unregister.route, registrationCtrl.unregister());
    app.post(actions.confirm.route, registrationCtrl.confirm());

    // Private routes
    app.get('/api/helloworld', auth, registrationCtrl.helloWorld());
    app.get(regBaseUrl, auth, registrationCtrl.readAllRegistrations());
    app.post(actions.checkIn.route, auth, registrationCtrl.checkIn());
};
