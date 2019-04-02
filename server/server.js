const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require('express-session');
// const http = require('http');
// const https = require('https');
const passport = require('./user.local-strategy');

require('dotenv').config();
require('./db');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const inProd = NODE_ENV === 'production';

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

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
app.use(express.static('build'));

/** ---------- PASSPORT MIDDLEWARE ---------- **/
app.use(passport.initialize());
app.use(passport.session());

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/urls', require('./url.router'));
app.use('/api/users', require('./user.router'));
app.use('/', require('./website.router'))
/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}.`);
});

// const httpServer = http.createServer(app);
// httpServer.on('request', (req, res) => {
// 	console.log('http request');
// 	console.log(req.headers);
// })
// httpServer.listen(80, () => {
// 	console.log(`listening on http server`);
// })

// const httpsServer = https.createServer(app);
// httpsServer.on('request', (req, res) => {
// 	console.log('https');
// 	console.log(req.headers);
// })
// httpsServer.listen(443, () => {
// 	console.log(`listening on https server`);
// })
