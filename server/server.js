const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlRouter = require('./url.router.js');
require('./db');

const PORT = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));


/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/urls', urlRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
		console.log(`Listening on port ${PORT}.`);
});