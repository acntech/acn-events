module.exports = function (app) {
	var registrationCtrl = require('../lib/controllers/registration.js');
	var masSeatsCtrl  = require('../lib/controllers/max_seats.js');
	var actionCtrl = require('../lib/controllers/actions.js');
	var eventCtrl = require('../lib/controllers/eventController.js');
	var userCtrl = require('../lib/controllers/userController.js');

	var regBaseUrl = '/api/event/registrations';
	var maxSeatsBaseUrl = '/api/event';

	// Public routes
	app.get(regBaseUrl + '/:id', registrationCtrl.readRegistration());
	app.get(maxSeatsBaseUrl, masSeatsCtrl.countConfirmedReg());
	app.post(actionCtrl.register.route, registrationCtrl.register());
	app.delete(actionCtrl.unregister.route, registrationCtrl.unregister());
	app.post(actionCtrl.confirm.route, registrationCtrl.confirm());

	// Private routes TODO: Authentication is removed. It's not private!
	app.get(regBaseUrl,  registrationCtrl.readAllRegistrations());
	app.post(actionCtrl.checkIn.route, registrationCtrl.checkIn());


	// ## New routes for the more advanced application: ##

	//Event
	app.get('/rest/api/1/event', eventCtrl.getAllEvents)
	app.get('/rest/api/1/event/:id', eventCtrl.getAnEvent)
	app.post('/rest/api/1/event', eventCtrl.createEvent) //create
	app.put('/rest/api/1/event/:id', eventCtrl.updateEvent) //update
	app.delete('/rest/api/1/event/:id', eventCtrl.deleteEvent)

	//User
	app.get('/rest/api/1/user', userCtrl.getAllUsers)
	app.get('/rest/api/1/user/:id', userCtrl.getAnUser)
	app.post('/rest/api/1/user', userCtrl.createUser) //create
	app.put('/rest/api/1/user/:id', userCtrl.updateUser) //update
	app.delete('/rest/api/1/user/:id', userCtrl.deleteUser)

};
