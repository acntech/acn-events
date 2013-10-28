var nodemailer = require("nodemailer");
var fs = require('fs');
var path = require('path');
var mailOptions, transport;
var config = require('./config');

// Registered constants
var registeredText = "Hei {name}, \n" +
    "\n" +
    "Takk for din interesse for \"Brukeropplevelse i moderne tid\"! \n" +
    "\n" +
    "Du må bekrefte din deltakelse ved å klikke her: \n" +
    config.host + "/registrations/{id}/confirm \n" +
    "\n" +
    "For å avregistrere deg klikk her: \n" +
    config.host + "/registrations/{id}/unregister \n" +
    "\n" +
    "Jeg ser fram til en faglig og sosial kveld! \n" +
    "\n" +
    "Mvh \n" +
    "Tonny Gundersen, \n" +
    "leder Accenture Architecture, Delivery and Integration \n" +
    "\n" +
    "\n" +
    "============================================================== \n" +
    "Sted:               Teknologihuset, Pilestredet 56, 0167 Oslo \n" +
    "Dato:               Onsdag 20. november 2013 \n" +
    "Tid:                 17:00 - 21:00 \n" +
    "Mat og drikke:  Tapas, mineralann/øl serveres fra 18:00 \n" +
    "============================================================== \n" +
    "\n" +
    "\n" +
    "Følgende informasjon er lagret om deg: \n" +
    "Navn: {name} \n" +
    "Telefon: {phone} \n" +
    "Email: {email} \n";
var registeredSubject = "Bekreft din deltakelse på Accenture fagkveld 20. november";

// Unregistered constants
var unregisteredText = "Hei {name}, \n" +
    "\n" +
    "Du er nå avregistrert på \"Brukeropplevelse i moderne tid!\" \n" +
    "\n" +
    "Jeg håper vi treffes ved senere anledning. Ta gjerne kontakt hvis du lurer på noe! \n" +
    "\n" +
    "Mvh \n" +
    "Tonny Gundersen, \n" +
    "leder Accenture Architecture, Delivery and Integration \n" +
    "\n" +
    "============================================================== \n" +
    "Følgende informasjon er lagret om deg: \n" +
    "Navn: {name} \n" +
    "Telefon: {phone} \n" +
    "Email: {email} \n";
var unregisteredSubject = "Du er avregistrert på Accenture fagkveld 20. november";

transport = nodemailer.createTransport("SMTP", {
    host: "smtp.gmail.com",
    secureConnection: true,
    port: 465,
    auth: {
        user: config.mailAutUser,
        pass: config.mailAutPass
    }
});

function sendMail(subject, text, sendCalendarFile) {
    mailOptions = {
        from: config.fromEmail,
        to: config.toEmail,
        subject: subject,
        text: text
    };

    if(sendCalendarFile)
    {
        mailOptions["attachments"] = [
            {
                fileName: "accenture-fagkveld.ics",
                streamSource: fs.createReadStream(path.join(__dirname, "accenture-fagkveld.ics"))
            }
        ]
    }

    transport.sendMail(mailOptions, function (error, responseStatus) {
        if (error) {
            console.error("Failed sending email: " + error);
        }
    });

    transport.close();
}
exports.sendRegisteredMail = function (id, name, email, phone) {
    var renderedText = registeredText.replace(/{id}/g, id);
    renderedText = renderedText.replace(/{name}/g, name);
    renderedText = renderedText.replace(/{email}/g, email);
    renderedText = renderedText.replace(/{phone}/g, phone);
    sendMail(registeredSubject, renderedText, true);
}

exports.sendUnRegisteredMail = function (id, name, email, phone) {
    var renderedText = unregisteredText.replace(/{id}/g, id);
    renderedText = renderedText.replace(/{name}/g, name);
    renderedText = renderedText.replace(/{email}/g, email);
    renderedText = renderedText.replace(/{phone}/g, phone);
    sendMail(unregisteredSubject, renderedText, false);
}