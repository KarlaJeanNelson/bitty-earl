const crypto = require('crypto');

// module.exports = longurl => {
// 	const strLen = getRandomInt(6, 9)
// 	const strStart = getRandomInt(0, 54)
// 	let hash = crypto.createHmac('sha256', longurl).digest('hex')
// 	hash = hash.substring(strStart, strStart + strLen)
// 	return hash;
// }

module.exports = longurl => new Promise((resolve, reject) => {
	const strLen = getRandomInt(6, 9)
	const strStart = getRandomInt(0, 54)
	let hash;
	try {
		hash = crypto.createHmac('sha256', longurl).digest('hex')
		hash = hash.substring(strStart, strStart + strLen)
		resolve({ longurl, shorturl: hash })
	} catch(e) {
		reject(e.message)
	}
})

//The maximum is exclusive and the minimum is inclusive
const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - min)) + min)