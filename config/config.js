var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'production';

var config = {
  production: {
    root: rootPath,
    app: {
      name: 'acnfagkveld-backend'
    },
    port: process.env.PORT || 5000,
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/heroku_app18823270',
    fromEmail: 'Fagkveld mailer <mailer.acn@gmail.com>',
    toEmail: 'Ismar Slomic <ismar.slomic@accenture.com>',
    frontendHost: 'http://acnfagkveld.herokuapp.com',
    maxSeats: 100
  },
  test: {
    root: rootPath,
    app: {
      name: 'acnfagkveld-backend-test'
    },
    port: process.env.PORT || 5000,
    db: 'mongodb://localhost/heroku_app18823270_test',
    fromEmail: 'Fagkveld mailer <mailer.acn@gmail.com>',
    toEmail: 'Ismar Slomic <ismar.slomic@accenture.com>',
    frontendHost: 'http://localhost:4000',
    maxSeats: 100
  }

};

module.exports = config[env];
