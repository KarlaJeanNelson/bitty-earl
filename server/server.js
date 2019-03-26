const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const urlRouter = require('./url.router');
require('./db');

const PORT = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));
app.use(cors());

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/urls', urlRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
		console.log(`Listening on port ${PORT}.`);
});