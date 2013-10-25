var mongoose = require('mongoose'),
    Registration = mongoose.model('Registration');

// Hello World function
exports.helloWorld = function () {
    return function (req, res) {
        res.links({
            self: 'http://localhost:5000/api/event/registrations/helloworld',
            next: 'http://localhost:5000/api/event/registrations/helloworld2'
        });
        res.send('Hello World')
    };
};

// Read all registrations
exports.readAllRegistrations = function () {
    return function (req, res) {
        Registration.find(function (error, registrations) {
            if (error)
                res.json(error);
            else
                res.json(registrations);
        });
    };
};

// Read the registration
exports.readRegistration = function () {
    return function (req, res) {
        Registration.findById(req.params.id, function (error, registration) {
            if (error)
                res.json(error);
            else
                res.json(registration);
        });
    };
};

// Register user to this event. If the user with same email already exists, return 400 with error message
// TODO: do user see resource URL of newly created registration?
// TODO: how to put allowed states as hyperlinks to the registration?
exports.register = function (selfUrl) {
    return function (req, res) {
        var newRegistration = new Registration(req.body);

        Registration.count({
                $and: [
                    {email: newRegistration.email},
                    {state: 'registered'}
                ]
            },
            function (error, count) {
                if (error) {
                    res.json(400, error);
                }
                else {
                    if (count > 0) {
                        res.json(400, {error: 'User with this email is already registered.'});
                    }
                    else {
                        newRegistration.state = 'registered';
                        newRegistration.save(function (error, registration) {
                            if (error || !newRegistration) {
                                res.json(400, error);
                            } else {
                                res.links({
                                    self: selfUrl + "/" + newRegistration.id,
                                });
                                res.json(newRegistration);
                            }
                        });
                    }
                }
            }

        )
        ;
    };
}
;

var isRegistered = function(email){
    Registration.count({
        $and: [
            {email: email},
            {state: 'registered'}
        ]
    }
}

// Unregister the user for this event
exports.unregister = function (req, res) {
    return function (req, res) {
        Registration.findById(req.params.id, function (error, registration) {
            if (error)
                res.json(error);
            else {
                if (registration == null) {
                    res.status(404).send('Registration with id ' + req.params.id + ' not found');
                }
                else {
                    registration.state = 'unregistered';
                    registration.updated = new Date();
                    registration.save(function (err, unRegistration) {
                        if (err)
                            res.json(err);
                        else {
                            res.json(unRegistration);
                        }
                    });
                }
            }
        });
    };
};

// Confirm the user for this event
exports.confirm = function (req, res) {
    return function (req, res) {
        Registration.findById(req.params.id, function (error, registration) {
            if (error)
                res.json(error);
            else {
                if (registration == null) {
                    res.status(404).send('Registration with id ' + req.params.id + ' not found');
                }
                else {
                    registration.state = 'confirmed';
                    registration.updated = new Date();
                    registration.save(function (err, unRegistration) {
                        if (err)
                            res.json(err);
                        else {
                            res.json(unRegistration);
                        }
                    });
                }
            }
        });
    };
};

// Checking the user for this event
exports.checkin = function (req, res) {
    return function (req, res) {
        Registration.findById(req.params.id, function (error, registration) {
            if (error)
                res.json(error);
            else {
                if (registration == null) {
                    res.status(404).send('Registration with id ' + req.params.id + ' not found');
                }
                else {
                    registration.state = 'checkedin';
                    registration.updated = new Date();
                    registration.save(function (err, unRegistration) {
                        if (err)
                            res.json(err);
                        else {
                            res.json(unRegistration);
                        }
                    });
                }
            }
        });
    };
};