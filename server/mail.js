var mailer = require('nodemailer');
var config = require('./config');

var transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mail.email,
    pass: config.mail.password
  }
});

function sendEmail(options) {
  transporter.sendMail({
    from: config.mail.email,
    to: options.recipient,
    subject: options.subject,
    text: options.message
  }, function(error, info) {
    if (error) return console.log(error);
    console.log('Email sent: ' + info.response);
  });
};

exports.sendEmail = sendEmail;