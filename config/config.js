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
        db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/heroku_app18823270'
    },
    test: {
        root: rootPath,
        app: {
            name: 'acnfagkveld-backend-test'
        },
        port: process.env.PORT || 5000,
        db: 'mongodb://localhost/heroku_app18823270_test'
    }

};

module.exports = config[env];