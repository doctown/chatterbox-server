/* Import node's http module: */
var http = require('http');
var requestHandler = require('./request-handler');

// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;
var ip = '127.0.0.1';

// The function we pass to http.createServer will be used to handle all
// incoming requests.
var server = http.createServer(requestHandler);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);

