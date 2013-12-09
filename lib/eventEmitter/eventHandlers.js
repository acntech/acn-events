var ee = require('/lib/eventEmitter/myEventEmitter'),
	mongoose = require('mongoose'),
	Registration = mongoose.model('Registration'),
	is =

module.exports = function(io){

	ee.on('registeredAttendeesChange', function(){
		Registration.count({$or : [{state: actions.confirm.endState}, {state: actions.checkIn.endState}]}, function (error, count) {
			if (error) {
				io.
			}
			else {
				res.json({maxSeats: config.maxSeats, countConfirmed: count});
			}
		});
	})

}
