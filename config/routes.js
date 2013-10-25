module.exports = function (app) {
    var registrationCtrl = require('../app/controllers/registration');

    // Registration API Routes

    app.get('/api/event/registrations/helloworld', registrationCtrl.helloWorld());
    app.get('/api/event/registrations', registrationCtrl.readAllRegistrations());
    app.get('/api/event/registrations/:id', registrationCtrl.readRegistration());
    app.post('/api/event/registrations', registrationCtrl.register('/api/event/registrations'));
    app.delete('/api/event/registrations/:id', registrationCtrl.unregister());
    app.post('/api/event/registrations/:id/checkin', registrationCtrl.checkin());
    app.post('/api/event/registrations/:id/confirm', registrationCtrl.confirm());
};
