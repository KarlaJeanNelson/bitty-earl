const bcrypt = require('bcrypt');
const axios = require('axios');

const shortUrl = longurl => {
	let hash = bcrypt.hashSync(longurl, 10);
	hash = hash
		.replace(/[^a-z0-9A-z]/g, '')
		.substring(0, 8)
		.toLowerCase();
	return hash;
};

const checkProtocol = longurl =>
	longurl.startsWith('http://') || longurl.startsWith('https://')
		? longurl.toLowerCase()
		: 'https://' + longurl.toLowerCase();

const responseUrl = longurl => {
	let testUrl = checkProtocol(longurl);
	axios(testUrl)
		.then(response => ({
			error: false,
			status: response.status,
			message: response.request.res.responseUrl
		}))
		.catch(e =>
			e.response
				? {
						error: true,
						status: e.response.status,
						message: e.response.statusText
				  }
				: { error: true, status: 400, message: `Address ${testUrl} not found` }
		);
};

const pre =
	process.env.NODE_ENV === 'production'
		? 'bitty-earl.herokuapp.com/'
		: 'localhost:5000/';

module.exports = {
	shortUrl,
	checkProtocol,
	responseUrl,
	pre
};
