'use strict';

// Module dependencies.
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
    path = require('path'),
    fs = require('fs'),
    ee = require('./lib/eventEmitter/myEventEmitter')


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

// Routes
require('./config/routes.js')(app);

server.on('connect', function(){
    ee.emit('registeredAttendeesChange')
})

// Start server
var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Express server listening on port %d and is in the "%s" mode', port, app.get('env'));
});
