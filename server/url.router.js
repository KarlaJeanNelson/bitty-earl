const express = require('express');
const router = express.Router();
const myUrl = require('./url.controller');
const user = require('./user.controller');

router
	.route('/')
	.get(user.isAuthenticated, myUrl.get)
	.post(user.isAuthenticated, myUrl.exists, myUrl.post);

router.route('/:id').delete(user.isAuthenticated, myUrl.delete);

module.exports = router;
