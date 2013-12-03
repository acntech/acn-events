'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs');

var app = express();

require('sugar') //add syntactic sugar to javascript, see http://sugarjs.com

// Express config
require('./config/express.js')(app, express, path);

// Connect to database
var db = require('./lib/db/mongo');

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Populate empty DB with dummy data
var dummyDataPath = path.join(__dirname, 'lib/db/dummydata');
fs.readdirSync(dummyDataPath).forEach(function (file) {
  require(dummyDataPath + '/' + file);
});

// Controllers
var api = require('./lib/controllers/api');



// Routes
app.get('/api/awesomeThings', api.awesomeThings);
require('./config/routes.js')(app);


// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server is now listening on http://localhost:%d and is in "%s" mode', port, app.get('env'));
});
