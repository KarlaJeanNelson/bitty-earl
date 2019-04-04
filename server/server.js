const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./user.local-strategy');

require('dotenv').config();
require('./db');
// require('./website.utils');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const inProd = NODE_ENV === 'production';

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

/** ---------- SESSION MIDDLEWARE ---------- **/
const mySession = {
	secret: process.env.SERVER_SESSION_SECRET || 's00perD00perS3cr3t', // set this in your .env file
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: { maxage: 60000000, secure: inProd ? true : false },
}
app.use(session(mySession));
app.use(express.static('build'));

/** ---------- PASSPORT MIDDLEWARE ---------- **/
app.use(passport.initialize());
app.use(passport.session());

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/urls', require('./url.router'));
app.use('/api/users', require('./user.router'));
app.use('/', require('./website.router'));

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}.`);
});
