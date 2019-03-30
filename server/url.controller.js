const axios = require('axios');
const Url = require('./url.model')
const crypto = require('crypto')

module.exports = class myUrl {
	static exists(req, res, next) {
		const { longurl } = req.body;
		axios(longurl)
			.then(response => 
				response.status === 200 ? next()
				: res.status(response.status).json({ error: true, message: response.statusText })
			)
			.catch(e => res.status(400).json({ error: true, message: `Address ${longurl} not found` }))
	}

	static post(req, res, next) {
		// console.log(`in myUrl.post`, req.user);
		const getShortId = crypto.randomBytes(4)
		const newUrl = {
			longurl: req.body.longurl,
			shorturl: getShortId.toString('hex'),
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
}