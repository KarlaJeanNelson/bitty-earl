const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./user.model');

passport.serializeUser((user, done) => {
	// console.log(`in serialize`, user);
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
	// console.log(`in deserialize`);
  User.findById(userId, (err, user) => {
		// console.log(`in deserialize findById`, err, user);
		done(null, user)
	})
});

// Does actual work of logging in
passport.use('local', new LocalStrategy({
	passReqToCallback: true,
	usernameField: 'email',
}, ((req, email, password, done) => {
	// console.log(`in local strategy`, email, password);
	User.findOne({ email }, (err, user) => {
		// console.log(`in passport findOne`, err, !user, !bcrypt.compareSync(password, user.password));
		err ? done(null, false, { message: err.message })
		: !user ? done(null, false, { message: 'Email not found.' })
		: !bcrypt.compareSync(password, user.password) ? done(null, false, { message: 'Incorrect password'})
		: done(null, user)
	})
})));

module.exports = passport;