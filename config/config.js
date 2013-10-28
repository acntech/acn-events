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
        fromEmail: "Ismar Slomic <ismar@slomic.no>",
        toEmail: "Ismar Slomic <ismar.slomic@accenture.com>",
        host: "http://go.accenture.com/acnfagkveld",
        mailAutUser: "ismar@slomic.no",
        mailAutPass: "FrefA6uv"
    },
    test: {
        root: rootPath,
        app: {
            name: 'acnfagkveld-backend-test'
        },
        port: process.env.PORT || 5000,
        db: 'mongodb://localhost/heroku_app18823270_test',
        fromEmail: "Ismar Slomic <ismar@slomic.no>",
        toEmail: "Ismar Slomic <ismar@slomic.no>",
        host: "http://localhost:5000",
        mailAutUser: "ismar@slomic.no",
        mailAutPass: "FrefA6uv"
    }

};

module.exports = config[env];