const bcrypt = require('bcrypt');
const User = require('./user.model');

module.exports = class myUser {
	static register(req, res) {
		bcrypt.hash(req.body.password, 10)
			.then(hash => {
				User.create({
					email: req.body.email,
					password: hash
				})
					.then(user => res.status(201).json({ _id: user._id, email: user.email }))
					.catch(e => res.status(400).json({ error: true, message: e.message }))
			})
			.catch(e => res.status(400).json({ error: true, message: e.message }))
	}

	static login(req, res) {
		// console.log(`in login`);
    res.status(200).json({
      email: req.user.email,
      id: req.user._id
    });
	}

	static logout(req, res) {
		req.logout();
		req.session.destroy();
		res.redirect('/');
	}

	static get(req, res) {
    res.status(200).send({
      email: req.user[0].email,
      id: req.user[0].id
    })
  }

  static isLoggedIn(req, res, next) {
    if (req.isAuthenticated() || process.env.NODE_ENV === 'test') {
      next()
    } else {
      console.log('nope');
      res.redirect('/');
    }
  }

}