const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');

const urlSchema = new Schema({
	longurl: { type: String, required: true, lowercase: true },
	shorturl: { 
		type: String,
		index: true,
		unique: true,
		required: true,
		lowercase: true
	},
	hitcount: { type: Number, required: true, default: 0 },
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
	},
	{ timestamps: true, strict: false }
);

urlSchema.index({ longurl: 1, user_id: 1 }, { unique: true })

module.exports = mongoose.model('Url', urlSchema);
