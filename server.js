'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs');

var app = express();

// Express config
require('./config/express.js')(app, express, path);

// Connect to database
var db = require('./lib/db/mongo');

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Routes
require('./config/routes.js')(app);


// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
