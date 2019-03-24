const express = require('express');
const router = express.Router();
const Url = require('./url.model');

// Url POST route
router.post('/', (req, res) => {
	const { newUrl } = req.body;
	// console.log(`in post route`, newUrl);
	// Url.create({ Url: newUrl }, (err, doc) => {
	// 	err ? res.json({ success: false, error: err }) : res.sendStatus(201)
	// })
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
	Url.find({}, (err, docs) => {
		console.log(docs);
		return err ? res.json({ success: false, error: err }) : res.send(docs)
	})
});

// Url DELETE route

module.exports = router;