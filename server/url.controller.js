const axios = require('axios');
const utils = require('./url.utils');
const Url = require('./url.model');

module.exports = class myUrl {
	static exists(req, res, next) {
		const { longurl } = req.body;
		let testUrl = utils.checkProtocol(longurl)
		axios(testUrl)
			.then(response => (
				response.status === 200 ? next()
				: res.status(response.status).json({ error: true, message: response.statusText })
			))
			.catch(e => res.status(400).json({ error: true, message: `Address ${longurl} not found` }))
	}

	static post(req, res, next) {
		// console.log(`in myUrl.post`, req.user);
		const { longurl } = req.body
		const newUrl = {
			longurl: utils.urlPath(longurl),
			shorturl: utils.shortUrl(longurl),
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
		const shortUrl = req.params.website
		console.log(`in redirect`, req.params);
		Url.findOneAndUpdate({ shorturl: shortUrl.toLowerCase() }, {$inc: { hitcount: 1 }})
			.then(doc => {
				console.log(doc.longurl);
				// document.cookie = `shorturl=${doc.shorturl}`
				!doc ? next() : res.redirect('https://' + doc.longurl);
			})
			.catch(err => res.status(400).json({ error: true, message: err.message }))
	}

	static increment(req, res, next) {
		// console.log(`in increment`, req.params);
		const longUrl = utils.urlPath(req.params.website);
		// If user logged in, only update that user's record;
		// otherwise, update all records that match the url.
		if (req.user) {
			Url.findOneAndUpdate({ longurl: longUrl, _id: req.user._id }, { $inc: {hitcount: 1} })
			.then(doc => {
				!doc ? res.status(200).json({ error: true, message: `No record found` })
				: res.status(200).json({ error: false, message: `Another hit for record ${doc._id}!` })
			})
			.catch(err => res.status(400).json({ error: true, message: err.message }))
		} else {
			Url.updateMany({ longurl: longUrl },
				{$inc: {hitcount: 1} })
			.then(docs => !docs ? 
				res.status(200).json({ error: true, message: `No records found` })
				: res.status(200).json({ error: false, message: `${docs.length} records updated!`})
			)
			.catch(e => res.status(400).json({ error: true, message: e.message }))
		}
	}
}