const axios = require('axios');
const utils = require('./url.utils');
const Url = require('./url.model');

module.exports = class myUrl {
	static exists(req, res, next) {
		const { longurl } = req.body;
		let testUrl = utils.checkProtocol(longurl)
			axios(testUrl)
			.then(response => {
					res.locals.responseUrl = response.request.res.responseUrl;
					next();
			})
			.catch(e => res.status(400).json({ error: true, message: `Address ${longurl} not found`}))		
	}

	static post(req, res, next) {
		const longurl = res.locals.responseUrl
		const newUrl = {
			longurl: longurl.toLowerCase(),
			shorturl: utils.pre + utils.shortUrl(longurl),
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
		if (!req.params.website) {next()}
		let shortUrl = utils.pre + req.params.website
		Url.findOneAndUpdate({ shorturl: shortUrl.toLowerCase() }, {$inc: { hitcount: 1 }})
			.then(doc => {
				// console.log(doc.longurl);
				!doc ? next() : res.redirect(doc.longurl);
			})
			.catch(err => res.status(400).json({ error: true, message: err.message }))
	}

	static increment(req, res, next) {
		// console.log(`in increment`, req.params);
		console.log(`in increment`, req.originalUrl);
		let longUrl = req.originalUrl || '';
		longUrl = utils.responseUrl(longUrl);
		console.log(longUrl)
		if (longUrl.error || longUrl.status >= 400) { 
			res.status(longUrl.status).json({ error: true, message: longUrl.message})
		}

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
				{ $inc: {hitcount: 1} })
			.then(docs => !docs ? 
				res.status(200).json({ error: true, message: `No records found` })
				: res.status(200).json({ error: false, message: `${docs.length} records updated!`})
			)
			.catch(e => res.json({ error: true, message: e.message }))
		}
	}
}