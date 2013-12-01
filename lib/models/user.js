'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	Name: String,
	Email: String,
	Picture: String,
	Mobile: Number,
	Description: String
});

mongoose.model('User', UserSchema);
