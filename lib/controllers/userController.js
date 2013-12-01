'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User')

exports.getAnUser = function(req, res) {
	User.findById(req.params.id, function (err, event) {
		if (!err) return res.json(event)
		else return res.send(500, err)
	})
}

exports.getAllUsers = function(req, res) {
	User.find({}, function (err, events) {
		if (!err) return res.json(events)
		else return res.send(500, err)
	})
}

exports.deleteUser = function(req, res) {
	User.findByIdAndRemove(req.params.id, function (err, events) {
		if (!err) return res.json(events)
		else return res.send(500, err)
	})
}

exports.createUser = function(req, res) {
	User(req.body).save(function (err, events) {
		if (!err) return res.json(events)
		else return res.send(500, err)
	})
}

exports.updateUser = function(req, res) {
	User.findOneAndUpdate(req.params.id, req.body, function (err, events) {
		if (!err) return res.json(events)
		else return res.send(500, err)
	})
}
