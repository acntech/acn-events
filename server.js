var express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    https = require('https'),
    fs = require('fs'),
    config = require('./config/config');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(modelsPath + '/' + file);
    }
});

var options = {
  key:  fs.readFileSync('ssl/privatekey.pem'),
  cert: fs.readFileSync('ssl/certificate.pem')
};

var server = https.createServer(options, app).listen(config.port, function () {
  console.log('Express server listening on port ' + app.get('port'));
})

require('./config/express')(app, config);
require('./config/routes')(app);
