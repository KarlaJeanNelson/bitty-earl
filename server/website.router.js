const express = require('express');
const router = express.Router();
const myUrl = require('./url.controller');

router.use(myUrl.sendToSite, myUrl.increment)

// router.use('/:website', myUrl.redirect, myUrl.increment)
	// .get(myUrl.redirect, myUrl.increment)

module.exports = router;