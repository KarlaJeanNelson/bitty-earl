const express = require('express');
const router = express.Router();
const myUrl = require('./url.controller');

router.route('/:website')
	.get(myUrl.redirect, myUrl.increment)

module.exports = router;