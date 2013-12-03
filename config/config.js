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
    toEmail: 'Simen Sægrov <simen.saegrov@accenture.com>',
    host: 'https://acnfagkveld-backend.herokuapp.com',
    frontendHost: 'http://acnfagkveld.herokuapp.com',
    mailAutUser: '<DONT HAVE THE PASSWD/USER HERE>',
    mailAutPass: '<DONT HAVE THE PASSWD/USER HERE>',
    autUser: '<DONT HAVE THE PASSWD/USER HERE>',
    autPass: '<DONT HAVE THE PASSWD/USER HERE>',
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
    toEmail: 'Simen Sægrov <simen.saegrov@accenture.com>',
    host: 'http://localhost:5000',
    frontendHost: 'http://localhost:4000',
    mailAutUser: '<DONT HAVE THE PASSWD/USER HERE>',
    mailAutPass: '<DONT HAVE THE PASSWD/USER HERE>',
    autUser: '<DONT HAVE THE PASSWD/USER HERE>',
    autPass: '<DONT HAVE THE PASSWD/USER HERE>',
    maxSeats: 100
  }

};

module.exports = config[env];
