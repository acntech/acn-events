module.exports = function (app, express, path) {
// Express Configuration
  app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
  });

  app.configure('development', function () {
    app.use(express.static(path.join(__dirname, '../' , '.tmp')));
    app.use(express.static(path.join(__dirname, '../' , 'app')));
    app.use(express.errorHandler());
  });

  app.configure('production', function () {
    app.use(express.static(path.join(__dirname,  '../' ,'public')));
  });
};