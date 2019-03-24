const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
	longurl: String,
	shorturl: String,
	user: String
	},
	{ timestamps: true, strict: false }
);

module.exports = mongoose.model('Url', urlSchema);
