var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');
var config = require('./config');

// Registered constants
var registeredText = fs.readFileSync(path.join(__dirname, '../email', 'registeredMail.txt')).toString();
var registeredSubject = 'Bekreft din deltakelse på Accenture fagkveld 20. november';

// Unregistered constants
var unregisteredText = fs.readFileSync(path.join(__dirname, '../email', 'unregisteredMail.txt')).toString();
var unregisteredSubject = 'Du er avregistrert på Accenture fagkveld 20. november';


function sendMail(subject, text, sendCalendarFile) {
  var transport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: config.mailAutUser,
      pass: config.mailAutPass
    }
  });

  var mailOptions = {
    from: config.fromEmail,
    to: config.toEmail,
    subject: subject,
    text: text
  };

  if (sendCalendarFile) {
    mailOptions['attachments'] = [
      {
        fileName: 'accenture-fagkveld.ics',
        streamSource: fs.createReadStream(path.join(__dirname, '../email', 'accenture-fagkveld.ics'))
      }
    ]
  }

  console.log('Sending email to: ' + mailOptions.to + ' from: ' + mailOptions.from);
//  transport.sendMail(mailOptions, function (error, responseStatus) {
//
//    if (error) {
//      console.error('Failed sending email: ' + error);
//    }
//
//    console.log(responseStatus)
//  });
//  transport.close();
}
exports.sendRegisteredMail = function (id, name, email, phone) {
  var renderedText = registeredText.replace(/%id%/g, id);
  renderedText = renderedText.replace(/%name%/g, name);
  renderedText = renderedText.replace(/%email%/g, email);
  renderedText = renderedText.replace(/%phone%/g, phone);
  renderedText = renderedText.replace(/%frontendHost%/g, config.frontendHost);
  sendMail(registeredSubject, renderedText, true);
};

exports.sendUnRegisteredMail = function (id, name, email, phone) {
  var renderedText = unregisteredText.replace(/%id%/g, id);
  renderedText = renderedText.replace(/%name%/g, name);
  renderedText = renderedText.replace(/%email%/g, email);
  renderedText = renderedText.replace(/%phone%/g, phone);
  renderedText = renderedText.replace(/%frontendHost%/g, config.frontendHost);
  sendMail(unregisteredSubject, renderedText, false);
};