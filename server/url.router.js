const express = require('express');
const router = express.Router();
const myUrl = require('./url.controller');

router.route('/')
  .get(myUrl.get)
	.post(myUrl.exists, myUrl.post)

router.route('/:id')
	.delete(myUrl.delete)

module.exports = router;