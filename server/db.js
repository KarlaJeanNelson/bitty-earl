require('dotenv').config();
const mongoose = require('mongoose');

// If a mongoDB is specified in env config, use it.
// Otherwise, use local mongodb.
const mongoURI =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/bittyearl';

mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.on('connected', () => {
	console.log(`Connected to database ${mongoURI}.`);
});

mongoose.connection.on('error', err => {
	console.log(`Mongo connection error.`, err);
});
