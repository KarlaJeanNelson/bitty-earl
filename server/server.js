const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./user.local-strategy');
const myUrl = require('./url.controller')

require('dotenv').config();
require('./db');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const inProd = NODE_ENV === 'production';

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static('build'));

/** ---------- SESSION MIDDLEWARE ---------- **/
const mySession = {
	secret: process.env.SERVER_SESSION_SECRET || 's00perD00perS3cr3t', // please set this in your .env file
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: { maxage: 60000000, secure: false },
}
if (inProd) {
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
app.get('/:website', myUrl.redirect);

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}.`);
});

app.listen(3000, () => {
	console.log(`Listening on port ${PORT}.`);
});

// const httpServer = http.createServer()
// httpServer.listen(80)
// httpServer.on('request', (req, res) => console.log(req, res))
// https.createServer().listen(443);