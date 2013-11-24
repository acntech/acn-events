'use strict';

var mongoose = require('mongoose'),
  Registration = mongoose.model('Registration');


Registration.find({}).remove(function () {
  Registration.create(
    {
      state: 'registered',
      person: {
        name: 'Simen Sægrov',
        email: 'simen@abc.com',
        phone: '99887766'
      }
    }, {
      state: 'confirmed',
      person: {
        name: 'Rayner Vinterman',
        email: 'rayner@abc.com',
        phone: '99118822'
      }
    }, {
      state: 'checkedIn',
      person: {
        name: 'Simon Littleman',
        email: 'simon@abc.com',
        phone: '99227733'
      }
    }, {
      state: 'unregistered',
      person: {
        name: 'Vidar Fjellman',
        email: 'vidar@abc.com',
        phone: '99448811'
      }
    }, {
      state: 'registered',
      person: {
        name: 'Jon Fagerman',
        email: 'jon@abc.com',
        phone: '99227348'
      }
    }, {
      state: 'registered',
      person: {
        name: 'Ismar Slomicman',
        email: 'ismar@abc.com',
        phone: '99221100'
      }
    }, function (err) {
      if (err) {
        console.log(err);
        throw err;
      } else {
      }
      console.log('Finished populating registrations.');
    }
  );

});
