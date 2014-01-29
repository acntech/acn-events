var mongoose = require('mongoose'),
    Registration = mongoose.model('Registration');
var actions = require('./actions');
var email = require('../../config/email');
var config = require('../../config/config');


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
                console.log("Error finding person by email in register() with email: " + newRegistration.person.email);
                console.log(error);
            }
            else if (reg) {
                var validAction = actions.isValidNextAction(reg.state, actions.register.name);
                if (!validAction) {
                    res.json(400, 'Du er allerede registrert.');
                    console.log("User already registered with email: " + newRegistration.person.email);
                }
                else {
                    newRegistration.state = actions.register.endState;
                    newRegistration.save(function (error, registration) {
                        if (error || !registration) {
                            res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
                            console.log("Error saving person by email in register() with email: " + newRegistration.person.email);
                            console.log(error);
                        } else {
                            email.sendRegisteredMail(registration._id, registration.person.name,
                                registration.person.email, registration.person.phone, function (err) {
                                    if (err) {
                                        res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
                                        console.log("Failed to send email to user " + registration.person.email + ": ");
                                        console.log(err);
                                    } else {
                                        console.log("Email sent for registration " + registration._id + " and email " +
                                            registration.person.email)
                                        res.links(actions.register.links());
                                        res.json(registration);
                                    }
                                });
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
                        console.log("Registration stored successfully to database")
                        console.log("Sendind email to the user: " + registration.person.email)
                        email.sendRegisteredMail(registration._id, registration.person.name,
                            registration.person.email, registration.person.phone, function (err) {
                                if (err) {
                                    res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
                                    console.log("Failed to send email to user " + registration.person.email + ": ");
                                    console.log(err);
                                } else {
                                    console.log("Email sent for registration " + registration._id + " and email " +
                                        registration.person.email)
                                    res.links(actions.register.links());
                                    res.json(registration);
                                }
                            });
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
                        console.log("Registration is already unregistered with id: " + req.params.id);
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
                                console.log("Sending email for unregistered registration with id: " + req.params.id);
                                email.sendUnRegisteredMail(unRegistration._id, unRegistration.person.name,
                                    unRegistration.person.email, unRegistration.person.phone, function (err) {
                                        if (err) {
                                            res.json(500, "Teknisk feil. Kontakt ismar.slomic@accenture.com.");
                                            console.log("Failed to send email to user " + registration.person.email + ": ");
                                            console.log(err);
                                        } else {
                                            console.log("Email sent for registration " + registration._id + " and email " +
                                                registration.person.email)
                                            res.links(actions.register.links());
                                            res.json(unRegistration);
                                        }
                                    });
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
                        console.log("Registration already confirmed with id: " + req.params.id);
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
                                console.log("Successfully confirmed registration with id: " + req.params.id);
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
