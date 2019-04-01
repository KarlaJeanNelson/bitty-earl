const axios = require('axios');
const bcrypt = require('bcrypt');
const Url = require('./url.model');
const shorten = longurl => {
	let hash = bcrypt.hashSync(longurl, 10);
	hash = hash.replace(/[^a-z0-9A-z]/g, '').substring(0, 8)
	return hash;
}

module.exports = class myUrl {
	static exists(req, res, next) {
		const { longurl } = req.body;
		axios(longurl)
			.then(response => (
				response.status === 200 ? next()
				: res.status(response.status).json({ error: true, message: response.statusText })
			))
			.catch(e => res.status(400).json({ error: true, message: `Address ${longurl} not found` }))
	}

	static post(req, res, next) {
		// console.log(`in myUrl.post`, req.user);
		const newUrl = {
			longurl: req.body.longurl,
			shorturl: shorten(req.body.longurl),
			user_id: req.user._id
		}
		Url.create(newUrl, (err, doc) => {
			err ? res.status(400).json({ error: true, message: err.message })
			: res.status(201).json({ error: false, message: `New url added with id ${doc._id}` })
		})	
	}

	static get(req, res) {
		// console.log(`in myUrl.get`, req.user);
		Url.find({ user_id: req.user._id }, (err, docs) => {
			err ? res.status(400).json({ error: true, message: err.message })
			: res.status(200).json({ error: false, message: `Success!`, docs })
		})
	}

	static delete(req, res) {
		Url.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
			err ? res.status(400).json({ error: true, message: err.message })
			: res.status(200).json({ error: false, message: `Record ${doc._id} deleted` })
		})
	}

	static redirect(req, res, next) {
		// console.log(`in redirect`, req.params);
		!req.params.website ? next()
		: Url.findOneAndUpdate({ shorturl: req.params.website }, {$inc: { hitcount: 1 }})
			.then(doc => {
				// console.log(doc.longurl);
				// document.cookie = `shorturl=${doc.shorturl}`
				res.redirect(doc.longurl);
			})
			.catch(err => res.status(400).json({ error: true, message: err.message }))
	}

	// static increment(req, res, next) {
		// console.log(`in increment`, req.params);
		// if (!req.params.website) {res.status(400).json({ error: true, message: `Not found.` })}
		// if (req.user) {
		// 	Url.findOneAndUpdate({ longurl: req.params.website, _id: req.user._id }, { $inc: {hitcount: 1} })
		// 	.then(doc => {
		// 		!doc ? res.status(400).json({ error: true, message: `No documents found` })
		// 		: res.status(200).json({ error: false, message: `Another hit for record ${doc._id}!` })
		// 	})
		// 	.catch(err => res.status(400).json({ error: true, message: err.message }))
		// } else {
		// 	Url.update({ longurl: req.params.website }, {$inc: {hitcount: 1} }, {'multi': true}, (err, docs) => {
		// 		err ? res.status(400).json({ error: true, message: err.message })
		// 		: !docs ? res.status(400).json({ error: true, message: `No documents found` })
		// 		: res.status(200).json({ error: false, message: `${docs.length} records updated!`})
		// 	})
		// }
	// }
}