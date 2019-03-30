const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const getShortId = crypto.randomBytes(3)

const urlSchema = new Schema({
	longurl: { type: String, index: true, unique: true, required: true },
	shorturl: { 
		type: String,
		index: true,
		unique: true,
		required: true,
		default: getShortId.toString('hex')
	},
	hitcount: { type: Number, required: true, default: 0 },
	user_id: String
	},
	{ timestamps: true, strict: false }
);

module.exports = mongoose.model('Url', urlSchema);
