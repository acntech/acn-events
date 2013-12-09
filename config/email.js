'use strict';

var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');
var config = require('./config');
var templatesDir = path.resolve(__dirname, '..', 'email');
var emailTemplates = require('email-templates');

// Registered constants
var registeredSubject = 'Bekreft din deltakelse på Accenture fagkveld 20. november';

// Unregistered constants
var unregisteredSubject = 'Du er avregistrert på Accenture fagkveld 20. november';

function sendMail(sendCalendarFile, templateName, subject, id, name, email, phone, fn) {
  emailTemplates(templatesDir, function (err, template) {
    if (err) {
      return fn(err);
    }
    var locals = {
      frontendHost: config.frontendHost,
      id: id,
      name: name,
      email: email,
      phone: phone
    };
    template(templateName, locals, function (err, html, text) {
      if (err) {
        return fn(err);
      }

      var mailOptions = {
        from: config.fromEmail,
        to: email.endsWith('@accenture.com') ? email : config.toEmail,
        subject: subject,
        html: html,
        text: text
      };
      if (sendCalendarFile) {
        mailOptions.attachments = [{
          fileName: 'accenture-fagkveld.ics',
          streamSource: fs.createReadStream(path.join(__dirname, '../email', 'accenture-fagkveld.ics'))
        }];
      }
      var transport = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
          user: process.env.GOOGLE_SMTP_USERNAME,
          pass: process.env.GOOGLE_SMTP_PASSWORD
        }
      });

      if (process.env.NODE_ENV === 'test') {
        return fn(null, '250 2.0.0 OK 1350452502 s5sm19782310obo.10', html, text);
      }
      transport.sendMail(mailOptions, function (err, responseStatus) {
        if (err) {
          return fn(err);
        }
        console.log('Email successfully sent to: ' + mailOptions.to + ', response status: ');
        console.log(responseStatus);
      });
      transport.close();
    });
  });
}

exports.sendRegisteredMail = function (id, name, email, phone, fn) {
  var sendCalendarFile = true;
  var templateName = 'registered';

  sendMail(sendCalendarFile, templateName, registeredSubject, id, name, email, phone, fn);
};

exports.sendUnRegisteredMail = function (id, name, email, phone, fn) {
  var sendCalendarFile = false;
  var templateName = 'unregistered';

  sendMail(sendCalendarFile, templateName, unregisteredSubject, id, name, email, phone, fn);
};

/*function sendMail(subject, text, sendCalendarFile, email) {
  var transport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: process.env.GOOGLE_SMTP_USERNAME,
      pass: process.env.GOOGLE_SMTP_PASSWORD
    }
  }),
    mailSender = config.fromEmail,
    mailReciver = null;

  if (email.endsWith('@accenture.com')) {
    mailReciver = email;
  } else {
    mailReciver = config.toEmail;
  }

  var mailOptions = {
    from: mailSender,
    to: mailReciver,
    subject: subject,
    text: text
  };

  if (sendCalendarFile) {
    mailOptions.attachments = [{
      fileName: 'accenture-fagkveld.ics',
      streamSource: fs.createReadStream(path.join(__dirname, '../email', 'accenture-fagkveld.ics'))
    }];
  }

  console.log('Sending email to: ' + mailReciver + ' from: ' + mailSender);
  transport.sendMail(mailOptions, function (error, responseStatus) {

    if (error) {
      console.error('Failed sending email: ' + error);
    } else {
      console.log('Email successfully sent to: ' + mailReciver + ', response status: ');
      console.log(responseStatus);
    }
  });
  transport.close();
}

exports.sendUnRegisteredMail = function (id, name, email, phone) {
  var renderedText = unregisteredText.replace(/%id%/g, id)
    .replace(/%name%/g, name)
    .replace(/%email%/g, email)
    .replace(/%phone%/g, phone)
    .replace(/%frontendHost%/g, config.frontendHost);
  sendMail(unregisteredSubject, renderedText, false, email);
};*/
