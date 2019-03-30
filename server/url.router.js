const express = require('express');
const router = express.Router();
const Url = require('./url.model');
const urlExists = require('./url-exists')
const getShortUrl = require('./url-getshort');

// Url POST route
router.post('/', (req, res) => {
	const { newUrl } = req.body;
	// console.log(`in post router`, newUrl);
	urlExists(newUrl)
		.then(longurl => getShortUrl(longurl))
		.then(myUrl => createUrl(myUrl))
		.then(doc => {
			// console.log(`in then`, doc);
			res.json({ status: 201, error: false, message: `New record created with id ${doc._id}.`});
		})
		.catch(e => {
			// console.log(`in catch`, e.message);
			res.json({ status: 400, error: true, message: e.message })
		})
})

const createUrl = newUrl => new Promise((resolve, reject) => {
	Url.create(newUrl, (err, doc) => {
		if (err) {
			// console.log(`reject`, err.message);
			reject(new Error(err.message))
		} else {
			// console.log(`resolve`);
			resolve(doc)
		}
	})
})

// Url PUT route
router.put('/', (req, res) => {
	// const { payload } = req.body;
	// const updates = [];
	// const errors = [];
	// let i = 0;
	// payload.forEach((item) => {
	// 	Url.findOneAndUpdate({ id: item.id }, item, { upsert: true }, (err, doc) => {
	// 		err ? errors.push(item) : updates.push(item);
	// 		i++;
	// 		if (i === payload.length) {
	// 				res.json({ success: errors.length > 0, message: `${updates.length} updates, ${errors.length} errors` });
				
	// 		}
	// 	})
	// })
})

// Url GET route
router.get('/', (req, res) => {
	console.log(`in get route`);
	Url.find({}, (err, docs) => {
		console.log(docs);
		return err ? res.json({ status: 400, error: true, message: err.message })
		: res.json({ status: 200, error: false, docs })
	})
});

// Url DELETE route

module.exports = router;