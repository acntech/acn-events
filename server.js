/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , path = require('path')
    , httpProxy = require('http-proxy');

var app = express();

// all environments
var port = process.env.PORT || 9000;

app.set('port', port);

app.use(express.logger('dev'));

var proxy = new httpProxy.HttpProxy({
    target: {
        host: 'acnfagkveld-backend.herokuapp.com',
        //port: 5000 // todo: read from config
        https: true
//    rejectUnauthorized: false
    }
});

app.all('/api/*', function (req, res) {
    req.headers.host = 'acnfagkveld-backend.herokuapp.com';
    req.headers.https = true;
    proxy.proxyRequest(req, res);
});

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('production' == app.get('env')) {
    app.use(express.static(path.join(__dirname, 'dist')));
} else {
    app.use(express.static(path.join(__dirname, 'app')));
    app.use("/admin", express.static(path.join(__dirname, 'adminApp')));
    app.use(express.static(path.join(__dirname, '.tmp')));
    app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});
