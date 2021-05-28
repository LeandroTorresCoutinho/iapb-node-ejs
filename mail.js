"use strict";
const nodemailer = require("nodemailer");

const testAccount = {
    user: "saudemental@iapb.center",
    pass: "Mudar@123"
}

const transporter = nodemailer.createTransport({
    host: "mail.iapb.center",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendMail = (name, emailTo, subject, html, cb) => {
    const mailOptions = {
        sender: name,
        from: 'saudemental@iapb.center',
        to: emailTo,
        subject: subject,
        html: html, 
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

module.exports = sendMail;