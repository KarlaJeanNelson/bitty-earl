const fs = require('fs');
const http = require('http');
const httpProxy = require('http-proxy');

const logger = function() {    
  // This will only run once
  var logFile = fs.createWriteStream('./requests.log');

  return function (request, response, next) { 
    // This will run on each request.
    logFile.write(JSON.stringify(request.headers, true, 2));
    next();
  }
}

httpProxy.createServer(
  logger(), // <-- Here is all the magic
  {
    hostnameOnly: true,
    router: {
      'google.com': '*',
      'behance.net': '*'
  }
}).listen(80);