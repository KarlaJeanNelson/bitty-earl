const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('./user.controller');

router.route('/login')
	.post(passport.authenticate('local'), user.login)

router.route('/logout')
	.post(user.logout)

router.route('/')
	.post(user.register)
	.get(user.get)

module.exports = router;