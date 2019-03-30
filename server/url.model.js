const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const User = require('./user.model');

const getShortId = crypto.randomBytes(3)

const urlSchema = new Schema({
	longurl: { type: String, required: true },
	shorturl: { 
		type: String,
		index: true,
		unique: true,
		required: true,
		default: getShortId.toString('hex')
	},
	hitcount: { type: Number, required: true, default: 0 },
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
	},
	{ timestamps: true, strict: false }
);

urlSchema.index({ longurl: 1, user_id: 1 }, { unique: true })

module.exports = mongoose.model('Url', urlSchema);
