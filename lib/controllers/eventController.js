'use strict';

var mongoose = require('mongoose'),
	Event = mongoose.model('Event')

exports.getAnEvent = function(req, res) {
	Event.findById(req.params.id, function (err, event) {
		if (!err) return res.json(event)
		else return res.send(500, err)
	})
}

exports.getAnEventByField = function(req, res) {
	var keys = Object.keys(req.query)
	if (keys){
		var key = keys[0],
			value = req.query[key]
		Event.findOne({key: value}, function (err, event) {
			if (!err) return res.json(event)
			else return res.send(500, err)
		})
	} else {
		return res.send(500, "You need to give a filed key and a value. Ex: .../event/query?URI=someUri")
	}
}

exports.getAllEvents = function(req, res) {
	Event.find({}, function (err, events) {
		if (!err) return res.json(events)
		else return res.send(500, err)
	})
}

exports.deleteEvent = function(req, res) {
	Event.findByIdAndRemove(req.params.id, function (err, events) {
		if (!err) return res.json(events)
		else return res.send(500, err)
	})
}

exports.createEvent = function(req, res) {
	Event(req.body).save(function (err, events) {
		if (!err) return res.json(events)
		else return res.send(500, err)
	})
}

exports.updateEvent = function(req, res) {
	Event.findOneAndUpdate(req.params.id, req.body, function (err, events) {
		if (!err) return res.json(events)
		else return res.send(500, err)
	})
}
