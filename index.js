
const express = require('express');
const path = require('path');
const session = require('express-session');
const PORT = process.env.PORT || 5000;

const body_parser = require("body-parser");

const router = require('./routes');

const app = express();

app.set('trust proxy', 1);

const sess = session({
    secret: 'secret1234',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
});

app.use(sess);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(body_parser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', router);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
