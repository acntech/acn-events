var express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    fs = require('fs'),
    config = require('./config/config');

mongoose.connect(config.db);
console.log("Using database: " + config.db)
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

app.listen(config.port, function () {
    console.log('Listening on port ' + app.get('port') + " in " + process.env.NODE_ENV + " environment");
})

require('./config/express')(app, config);
require('./config/routes')(app);
