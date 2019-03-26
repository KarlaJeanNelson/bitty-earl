const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const getShortUrl = require('./url-getshort');

const urlSchema = new Schema({
	longurl: { type: String, index: true, unique: true, required: true },
	shorturl: { type: String, index: true, unique: true, required: true },
	user: String
	},
	{ timestamps: true, strict: false }
);

// urlSchema.pre('validate', next => {
// 	console.log(this.longurl);
// 	// this.shorturl = getShortUrl(this.longurl.toString());
// 	next();
// })

module.exports = mongoose.model('Url', urlSchema);
