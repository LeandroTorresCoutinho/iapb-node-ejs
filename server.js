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
app.use('/css', express.static(__dirname + '/views/css/'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
app.post('/contactsEmail', (req, res) => {
    const { name, assunto, email, message } = req.body;
    sendMail(name, 'leandro.torres.coutinho@gmail.com', "Contatos e dúvidas", message, email, function(err, data) {
        if (err) {
            res.status(500).json({ message: 'Internal Error' });
        } else {
            res.status(200).json({ message: 'E-mail enviado com sucesso!' });
            alert("Email enviado com sucesso.")
        }
    });
});

app.get('/ebookEmail', (req, res) => {
    const { name, assunto, email, message } = req.body;
    res.render(path.join(__dirname, 'views', 'index'), { title: 'Meu titulo', message: 'Olá mundo!'});

    // const { name, assunto, email, message } = req.body;
    // sendMail(name, 'leandro.torres.coutinho@gmail.com', "Download Ebook", message, email, function(err, data) {
    //     if (err) {
    //         res.status(500).json({ message: 'Internal Error' });
    //     } else {
    //         res.status(200).json({ message: 'E-mail enviado com sucesso!' });
    //         alert("Email enviado com sucesso.")
    //     }
    // });
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => log('Server is starting on PORT,', PORT));