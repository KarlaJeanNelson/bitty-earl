const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('cookie-session');
const passport = require('./user.local-strategy');
require('dotenv').config();
require('./db');

const PORT = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

/** ---------- SESSION MIDDLEWARE ---------- **/
session({
  secret: process.env.SERVER_SESSION_SECRET || 's00perD00perS3cr3t', // please set this in your .env file
  key: 'user', // this is the name of the req.variable. 'user' is convention, but not required
  resave: 'false',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
});

/** ---------- PASSPORT MIDDLEWARE ---------- **/
app.use(passport.initialize());
app.use(passport.session());

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/urls', require('./url.router'));
app.use('/api/users', require('./user.router'));

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
		console.log(`Listening on port ${PORT}.`);
});