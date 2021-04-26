const {app, http} = require("./app-config");
const express = require("express");
const path = require('path');
const session = require('express-session');
const PORT = process.env.PORT || 5000;

require('dotenv').config()

const body_parser = require("body-parser");

const router = require('./routes');

app.set('trust proxy', 1);

const sess = session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
});

app.use(sess);

app.use(express.static(path.join(__dirname, 'public')));
app.use('scripts', express.static(__dirname + 'public/scripts'));
app.use(express.urlencoded({ extended: true }));
app.use(body_parser.json({limit: '50mb', extended: true}))
app.use(body_parser.urlencoded({limit: '50mb', extended: true}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', router);
http.listen(PORT, () => console.log(`Listening on ${PORT}`));
