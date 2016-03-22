/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var dataStorage = [];


var requestHandler = function(request, response) {
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Logging
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // Check url
  if (request.url.startsWith('/classes/messages')) { // Route for classes/messeges
    // Handle a 'GET' request
    if (request.method === 'GET') {
      // CREATE A RESPONSE HEADER
      // The outgoing status.
      var statusCode = 200;
      // See the note below about CORS headers.
      var headers = defaultCorsHeaders;
      // Update to indicate that JSON will be used in the transfer
      headers['Content-Type'] = 'application/json';
      response.writeHead(statusCode, headers);

      // Write a message
      var responseText = {
        'results': dataStorage
      };
      response.write(JSON.stringify(responseText));

      // Make sure to always call response.end() - Calling .end "flushes"
      // the response's internal buffer, forcing node to actually send all the data over to the client.
      response.end();
    } else if (request.method === 'POST') {
      var body = [];
      request.on('data', function (chunk) {
        body.push(chunk);
      });

      request.on('end', function (chunk) {
        // Send an acknowledgment 200 OK response for now
        body = Buffer.concat(body).toString();
        //console.log(body);
        dataStorage.push(JSON.parse(body));
        response.writeHead(201, "OK", {'Content-Type': 'text/html'});
        response.end();
      });
    }
  } else if (request.url.startsWith('/classes/room')) { // Route for classes/room
    if (request.method === 'GET') {
      // TODO: Handle GET request for this url
    } else if (request.method === 'POST') {
      // TODO: Handle post request for this url
    }
  } else {
    var statusCode = 404;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'text/html';
    response.writeHead(statusCode, headers);
    response.write("<html><body><strong>PAGE NOT FOUND!</strong></body></html>");
    response.end();
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

// Exporting only one function
module.exports = requestHandler;