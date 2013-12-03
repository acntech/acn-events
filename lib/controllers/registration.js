var mongoose = require('mongoose'),
  Registration = mongoose.model('Registration');
var actions = require('./actions');
var email   = require('../../config/email');
var config  = require('../../config/config');

// Hello World function
exports.helloWorld = function () {
  return function (req, res) {
    res.links({
      self: config.host + '/api/event/registrations/helloworld',
      next: config.host + '/api/event/registrations/helloworld2'
    });
    res.send('Hello World')
  };
};

// Read all registrations
exports.readAllRegistrations = function () {
  return function (req, res) {
    Registration.find(function (error, registrations) {
      if (error) {
        res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
        console.log("Error reading all registrations: ");
        console.log(error);
      }
      else {
        res.json(registrations);
      }
    });
  };
};

// Read the registration
exports.readRegistration = function () {
  return function (req, res) {
    Registration.findById(req.params.id, function (error, registration) {
      if (error) {
        res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
        console.log("Error reading registration: ");
        console.log(error);
      }
      else if (!registration) {
        res.json(404, "Kunne ikke finne din registrering. Prøv igjen.");
        console.log("Could not read registration for id: " + req.params.id);
        console.log(error);
      }
      else {
        res.json(registration);
      }
    });
  };
};

// Register user to this event. If the user with same email already exists, return 400 with error message
// TODO: do user see resource URL of newly created registration?
// TODO: how to put allowed states as hyperlinks to the registration?
exports.register = function () {
  return function (req, res) {
    var newRegistration = new Registration(req.body);

    Registration.findOne({ 'person.email': newRegistration.person.email}, function (error, reg) {
      if (error) {
        res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
        console.log("Error finding person by email in register() with email: " + newRegistration.email);
        console.log(error);
      }
      else if (reg) {
        var validAction = actions.isValidNextAction(reg.state, actions.register.name);
        if (!validAction) {
          res.json(400, 'Du er allerede registrert.');
          console.log("User already registered with email: " + newRegistration.email);
          console.log(error);
        }
        else {
          newRegistration.state = actions.register.endState;
          newRegistration.save(function (error, registration) {
            if (error || !registration) {
              res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
              console.log("Error saving person by email in register() with email: " + newRegistration.email);
              console.log(error);
            } else {
              email.sendRegisteredMail(registration._id, registration.person.name,
                registration.person.email, registration.person.phone);
              res.links(actions.register.links());
              res.json(registration);
            }
          });
        }
      }
      else {
        newRegistration.state = actions.register.endState;
        newRegistration.save(function (error, registration) {
          if (error || !registration) {
            res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
            console.log("Error finding person by email in register() with email: " + newRegistration.email);
            console.log(error);
          } else {
            email.sendRegisteredMail(registration._id, registration.person.name,
              registration.person.email, registration.person.phone);
            res.links(actions.register.links());
            res.json(registration);
          }
        });
      }
    });
  };
}
;

// Unregister the user for this event
exports.unregister = function () {
  return function (req, res) {
    Registration.findById(req.params.id, function (error, registration) {
      if (error) {
        res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
        console.log("Error finding person in unregister() with id: " + req.params.id);
        console.log(error);
      }
      else {
        if (!registration) {
          res.json(404, "Kunne ikke finne din registrering. Prøv igjen.");
          console.log("Error finding person in unregister() with id: " + req.params.id);
          console.log(error);
        }
        else {
          var validAction = actions.isValidNextAction(registration.state, actions.unregister.name);
          if (!validAction) {
            res.json(400, 'Du er allerede avregistrert.');
          }
          else {
            registration.state = actions.unregister.endState;
            registration.updated = new Date();
            registration.save(function (error, unRegistration) {
              if (error) {
                res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
                console.log("Error saving registration in unregister() with id: " + req.params.id);
                console.log(error);
              }
              else {
                email.sendUnRegisteredMail(unRegistration._id, unRegistration.person.name,
                  unRegistration.person.email, unRegistration.person.phone);
                res.links(actions.unregister.links());
                res.json(unRegistration);
              }
            });
          }
        }
      }
    });
  };
};

// Confirm the user for this event
exports.confirm = function () {
  return function (req, res) {
    Registration.findById(req.params.id, function (error, registration) {
      if (error) {
        res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
        console.log("Error finding person in unregister() with id: " + req.params.id);
        console.log(error);
      }
      else {
        if (!registration) {
          res.json(404, "Kunne ikke finne din registrering. Prøv igjen.");
          console.log("Error finding person in confirm() with id: " + req.params.id);
          console.log(error);
        }
        else {
          var validAction = actions.isValidNextAction(registration.state, actions.confirm.name);
          if (!validAction) {
            res.json(400, 'Din registrering er allerede bekreftet.');
          }
          else {
            registration.state = actions.confirm.endState;
            registration.updated = new Date();
            registration.save(function (error, confirmedReg) {
              if (error) {
                res.json(404, "Kunne ikke finne din registrering. Prøv igjen.");
                console.log("Error finding person in unregister() with id: " + req.params.id);
                console.log(error);
              }
              else {
                res.links(actions.confirm.links());
                res.json(confirmedReg);
              }
            });
          }
        }
      }
    });
  };
};

// Checking the user for this event
exports.checkIn = function () {
  return function (req, res) {
    Registration.findById(req.params.id, function (error, registration) {
      if (error) {
        res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
        console.log("Error finding person in checkin() with id: " + req.params.id);
        console.log(error);
      }
      else {
        if (!registration) {
          {
            res.json(404, "Kunne ikke finne din registrering. Prøv igjen.");
            console.log("Error finding person in checkin() with id: " + req.params.id);
            console.log(error);
          }
        }
        else {
          var validAction = actions.isValidNextAction(registration.state, actions.checkIn.name);
          if (!validAction) {
            res.json(400, 'Deltaker har allerede blitt sjekket inn.');
          }
          else {
            registration.state = actions.checkIn.endState;
            registration.updated = new Date();
            registration.save(function (error, checkedInReg) {
              if (error) {
                res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
                console.log("Error saving registration in checkin() with id: " + req.params.id);
                console.log(error);
              }
              else {
                res.links(actions.checkIn.links());
                res.json(checkedInReg);
              }
            });
          }
        }
      }
    });
  };
};
