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


function sendMail(subject, text, sendCalendarFile, email) {
	var transport = nodemailer.createTransport('SMTP', {
			service: 'Gmail',
			auth: {
				user: process.env.GOOGLE_SMTP_USERNAME,
				pass: process.env.GOOGLE_SMTP_PASSWORD
			}
		}),
		mailSender = config.fromEmail,
		mailReciver = null;

	if (email.endsWith('@accenture.com')){
		mailReciver = email
	} else {
		mailReciver = config.toEmail
	}

	var mailOptions = {
		from: mailSender,
		to: mailReciver,
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

	console.log('Sending email to: ' + mailReciver + ' from: ' + mailSender);
	transport.sendMail(mailOptions, function (error, responseStatus) {

		if (error) console.error('Failed sending email: ' + error);
		console.log("Sendt mail OK:", responseStatus)
	});
	transport.close();
}
exports.sendRegisteredMail = function (id, name, email, phone) {
	var renderedText = registeredText.replace(/%id%/g, id)
		.replace(/%name%/g, name)
		.replace(/%email%/g, email)
		.replace(/%phone%/g, phone)
		.replace(/%frontendHost%/g, config.frontendHost);
	sendMail(registeredSubject, renderedText, true, email);
};

exports.sendUnRegisteredMail = function (id, name, email, phone) {
	var renderedText = unregisteredText.replace(/%id%/g, id)
		.replace(/%name%/g, name)
		.replace(/%email%/g, email)
		.replace(/%phone%/g, phone)
		.replace(/%frontendHost%/g, config.frontendHost);
	sendMail(unregisteredSubject, renderedText, false, email);
};
