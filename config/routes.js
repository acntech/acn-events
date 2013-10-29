module.exports = function (app) {
    var registrationCtrl = require('../app/controllers/registration'),
        actions = require('./actions'),
        express = require('express'),
        baseUrl = "/api/event/registrations";

    // Asynchronous
    var auth = express.basicAuth(function (user, pass, callback) {
        var result = (user === 'accenture' && pass === 'blåhimmel');
        callback(null /* error */, result);
    });

    app.get('/home', auth, function (req, res) {
        res.send('Hello World');
    });

    app.get('/noAuth', function (req, res) {
        res.send('Hello World - No Authentication');
    });

    // Public routes
    app.get(baseUrl + '/:id', registrationCtrl.readRegistration());
    app.post(actions.register.route, registrationCtrl.register(baseUrl));
    app.delete(actions.unregister.route, registrationCtrl.unregister());
    app.post(actions.confirm.route, registrationCtrl.confirm());

    // Private routes
    app.get(baseUrl + '/helloworld', auth, registrationCtrl.helloWorld());
    app.get(baseUrl, auth, registrationCtrl.readAllRegistrations());
    app.post(actions.checkIn.route, auth, registrationCtrl.checkIn());

};
