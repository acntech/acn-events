'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User')

exports.getAnUser = function(req, res) {
	User.findById(req.params.id, function (err, user) {
		if (!err) return res.json(user)
		else return res.send(500, err)
	})
}

exports.getAllUsers = function(req, res) {
	User.find({}, function (err, users) {
		if (!err) return res.json(users)
		else return res.send(500, err)
	})
}

exports.deleteUser = function(req, res) {
	User.findByIdAndRemove(req.params.id, function (err, users) {
		if (!err) return res.json(users)
		else return res.send(500, err)
	})
}

exports.createUser = function(req, res) {
	User(req.body).save(function (err, users) {
		if (!err) return res.json(users)
		else return res.send(500, err)
	})
}

exports.updateUser = function(req, res) {
	User.findOneAndUpdate(req.params.id, req.body, function (err, users) {
		if (!err) return res.json(users)
		else return res.send(500, err)
	})
}
