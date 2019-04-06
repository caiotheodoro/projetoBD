const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const uri = "mongodb://heroku_7tw4xsdw:i5vlsube7824c06kml6l5pl2fb@ds349455.mlab.com:49455/heroku_7tw4xsdw";

mongoose.connect(uri, { useNewUrlParser: true });
const bd = mongoose.connection;
bd.on('error', console.error.bind(console, 'Erro nessa porra:'));

app.listen(3000, function() {
    console.log('Este é seu primeiro servidor? Se for, parabéns, deu certo.');
});


app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/show', (req, res) => {
    
})