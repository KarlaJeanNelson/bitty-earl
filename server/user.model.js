const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema
const UserSchema = new Schema({
  email: { type: String, lowercase: true, unique: true, required: true },
  password: { type: String, required: true },
},
{
	timepstamps: true,
	strict: false
});

module.exports = mongoose.model('User', UserSchema);
