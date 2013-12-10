var ee = require('./myEventEmitter'),
	mongoose = require('mongoose'),
	Registration = mongoose.model('Registration')

module.exports = function(io){

	ee.on('registeredAttendeesChange', function(){
		Registration.count({$or : [{state: 'confirmed'}, {state: 'checkedIn'}]}, function (error, count) {
			if (error) {
				console.log("Error in registeredAttendeesChange event handler:", error)
			}
			else {
				io.emit('attending',{attending:count})
			}
		});
	})

}
