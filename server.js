const express = require('express');
const bodyParser = require('body-parser')
const sendMail = require('./mail');
const log = console.log;
const app = express();
const path = require('path');
const router = express.Router();
const PORT = 3060;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/scripts', express.static(__dirname + '/views/'));
app.use('/images', express.static(__dirname + '/views/images/'));
app.use('/files', express.static(__dirname + '/views/files/'));
app.use('/css', express.static(__dirname + '/views/css/'));
app.set('view engine', 'ejs');
app.post('/contactsEmail', (req, res) => {
    const { name, assunto, email, mensagem } = req.body;
    let html =`
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
                    <p style="white-space: nowrap"><b>Assunto:</b> ${assunto}</p>
                    <p style="white-space: nowrap"><b>E-mail:</b> ${email}</p>
                    <p ><b>Texto:</b> ${mensagem} </p>
                </div>
            </div>
            
        </body>
        </html>`
    
    sendMail(name, 'saudemental@iapb.center', "Contatos e dúvidas", html, function (err, data) {
        if (err) {
            res.render('pages/index', {messageEbook:'', message: 'Desculpe estamos com problemas no servidor:' + err.message });
        } else {
            res.render('pages/index', {messageEbook:'', message: 'Obrigado pela colaboração. Entraremos em contato assim que possível.' });
        }
    });
});

app.post('/ebookEmail', (req, res) => {
    const { name, email, empresa, area, cargo, telefone } = req.body;
    let html =`
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
                <h1>Download do E-book</h1>
                <p style="white-space: nowrap"><b>Nome:</b> ${name}</p>
                <p style="white-space: nowrap"><b>E-mail:</b> ${email}</p>
                <p style="white-space: nowrap"><b>Empresa:</b> ${empresa}</p>
                <p style="white-space: nowrap"><b>Area:</b> ${area}</p>
                <p style="white-space: nowrap"><b>Cargo:</b> ${cargo}</p>
                <p style="white-space: nowrap"><b>Telefone:</b> ${telefone}</p>
            </div>
        </div>
        
    </body>
    </html>`
    sendMail(name, 'saudemental@iapb.center', "Download Ebook", html, function (err, data) {
        if (err) {
            res.render('pages/index', {message:'', messageEbook: 'Desculpe estamos com problemas no servidor:' + err.message });
        } else {
            res.render('pages/index', {message:'', messageEbook: 'Cadastro feito com sucesso! O download se iniciará automaticamente.' });
        }
    });
    res.render('pages/index', {message:'', messageEbook: 'Cadastro feito com sucesso! O download se iniciará automaticamente.' });
});


app.get('/', function (req, res) {
    var message = ''
    res.render('pages/index', { message: '', messageEbook: '' });
});

app.listen(PORT, () => log('Server is starting on PORT,', PORT));