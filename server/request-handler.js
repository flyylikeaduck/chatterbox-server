/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/


var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  const { url, method, postdata } = request;
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  

  var fakeData = {
    results: []
  };
  

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';

  if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      response.writeHead(200, headers);
      response.end(JSON.stringify(fakeData));
    } 
    if (request.method === 'POST') {
      var results = [];
      request.on('data', (chunk) => {
        results.push(chunk);
      });
      
      request.on('end', () => {
        // json = '';
        // json += results.toString();
        results = Buffer.concat(results).toString();
        fakeData.results.push(results);
        response.writeHead(201, headers);
        console.log(fakeData);
        response.end(results); 
        
      });
    }
  } else {
    response.writeHead(404, headers);
    response.end('404');
  }


  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  // response.end(JSON.stringify('Hello, World!'));
};


module.exports.requestHandler = requestHandler;