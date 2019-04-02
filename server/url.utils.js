const bcrypt = require('bcrypt');

const shortUrl = longurl => {
	let hash = bcrypt.hashSync(longurl, 10);
	hash = hash.replace(/[^a-z0-9A-z]/g, '').substring(0, 8).toLowerCase();
	return hash;
}
const urlPath = longurl => {
	let path = longurl.replace(/(https?:\/\/(?:www\.|(?!www)))/, '').toLowerCase();
	return path;
}

const checkProtocol = longurl => (
	longurl.startsWith('http://') || longurl.startsWith('https://') ? longurl.toLowerCase()
	: 'https://' + longurl.toLowerCase()
)

module.exports = {
	shortUrl,
	urlPath,
	checkProtocol
}