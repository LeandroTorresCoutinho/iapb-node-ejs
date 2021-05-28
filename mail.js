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

const sendMail = (name, emailTo, subject, text, email, cb) => {
    const mailOptions = {
        sender: name,
        from: 'saudemental@iapb.center',
        to: emailTo,
        subject: subject,
        text: text, 
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='utf-8'>
                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                <meta name='viewport' content='width=device-width, initial-scale=1'>
            </head>
            <body style="background-color: #FFFFFF;">
                <div style="content: ''; display: table; clear: both; width: 1300px;">
                    <div style="float: left; width: 20%; ">
                        <img src="http://iapb.center/images/logo-vertical.png"/>
                    </div>
                    <div style="float: left; width: 80%; font-size: 16px; line-height: 30px; margin-top: 50px; overflow:auto">
                        <h1>Contatos e Dúvidas</h1>
                        <p style="white-space: nowrap"><b>Nome:</b> ${name}</p>
                        <p style="white-space: nowrap"><b>Assunto:</b> ${subject}</p>
                        <p style="white-space: nowrap"><b>E-mail:</b> ${email}</p>
                        <p ><b>Texto:</b> ${text} </p>
                    </div>
                </div>
                
            </body>
            </html>
        `, 
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