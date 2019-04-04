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
	failureFlash: true
}, ((req, email, password, done) => {
	// console.log(`in local strategy`, req);
	User.findOne({ email }, (err, user) => {
		// console.log(`in passport findOne`, err, !user, !bcrypt.compareSync(password, user.password));
		// console.log(err, user);
		if (user && bcrypt.compareSync(password, user.password)) {
			req.session.user = user;
			done(null, user)
		} else {
			let message = err ? err.message
			: !user ? 'Email not found. Please register!'
			: !bcrypt.compareSync(password, user.password) ? 'Incorrect password'
			: 'Something went wrong!'
			req.res.status(400).json({ error: true, message })
			done(null, false, { message })
		}
	})
})));

module.exports = passport;