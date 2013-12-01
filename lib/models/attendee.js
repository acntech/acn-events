'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AttendeeSchema = new Schema({
	Name: String,
	Email: String,
	Mobile: Number
});

mongoose.model('Attendee', AttendeeSchema);
