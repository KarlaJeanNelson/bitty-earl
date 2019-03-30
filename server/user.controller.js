const bcrypt = require('bcrypt');
const User = require('./user.model');

module.exports = class myUser {
	static register(req, res) {
		User.create({
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10)
		})
		.then(user => res.status(201).json({ _id: user._id, email: user.email }))
		.catch(e => res.status(400).json({ error: true, message: e.message }))
}

	static login(req, res) {
		// console.log(`in login`, req.user);
    res.status(200).json({
      email: req.user.email,
      _id: req.user._id
    });
	}

	static logout(req, res) {
		req.logout();
		req.session.destroy();
		res.redirect('/');
	}

	static get(req, res) {
		// console.log(`in getuser`, req.user);
    res.status(200).json(req.user)
  }

  static isAuthenticated(req, res, next) {
		// console.log(`in isAuthenticated`, req.isAuthenticated());
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({ error: true, message: 'User not authenticated' });
    }
  }
}