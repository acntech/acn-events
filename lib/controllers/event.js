var mongoose = require('mongoose'),
  Registration = mongoose.model('Registration');

var config = require('../../config/config');
var actions = require('./actions');

// Count confirmed registrations
exports.countConfirmedReg = function () {
  return function (req, res) {
    Registration.count({$or : [{state: actions.confirm.endState}, {state: actions.checkIn.endState}]}, function (error, count) {
      if (error) {
        res.json({maxSeats: config.maxSeats, countConfirmed: 0});
      }
      else {
        res.json({maxSeats: config.maxSeats, countConfirmed: count});
      }
    });
  };
};