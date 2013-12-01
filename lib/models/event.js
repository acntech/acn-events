'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var EventSchema = new Schema({
	Title: String,
	URI: String,
	Ingress: String,
	MainColor: String,
	JumbotronColor: String,
	Description: String,
	StartDate: Date,
	EndDate: Date,
	MaxSeats: Number,
	IngressBackground: String,
	Location: {
		Address: String,
		Postcode: String,
		City: String,
		Country: String,
		URL: String
	},
	Agenda: {
		info: String
	},
	Happening: {
		Title: String,
		Description: String,
		StartTime: Date,
		EndTime: Date
	}
});

mongoose.model('Event', EventSchema);
