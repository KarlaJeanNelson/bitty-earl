const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./user.local-strategy');
require('dotenv').config();
require('./db');

const PORT = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

/** ---------- SESSION MIDDLEWARE ---------- **/
const mySession = {
	secret: process.env.SERVER_SESSION_SECRET || 's00perD00perS3cr3t', // please set this in your .env file
  key: 'user',
  resave: false,
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  mySession.cookie.secure = true // serve secure cookies
}
app.use(session(mySession));

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