const http = require('http');
const https = require('https');
const url = require('url');
// const getShortUrl = require('./url-getshort');

const request = (opts = {}, cb) => {
  const requester = opts.protocol === 'https:' ? https : http;
  return requester.request(opts, cb);
};

module.exports = target => new Promise((resolve, reject) => {
  let uri;

  try {
    uri = url.parse(target);
  } catch (err) {
    reject(new Error(`Invalid url ${target}`));
  }

	const { host, protocol, port, path } = uri;
	const options = {
		method: 'HEAD',
		host,
		protocol,
		port,
		path,
		timeout: 5 * 1000
	}

  const req = request(options, (res) => {
    const { statusCode } = res;

    if (statusCode >= 200 && statusCode < 300) {
			// const shorturl = getShortUrl(target.toString())
			// console.log(`shorturl`, shorturl);
      resolve(target.toString());
    } else {
      reject(new Error(`Url ${target} not found.`));
    }
  });

  req.on('error', e => reject(e.message));

  req.end();
});