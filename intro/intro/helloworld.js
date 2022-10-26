
// Load the http.js module. http.js comes pre-packaged with node.js
var http = require('http');

var handler = function (request, result) {
 
result.writeHead(200, {'Content-Type': 'text/plain'});
result.end('Hello World');
}


// Returns a new instance of http.Server.
var server = http.createServer(handler);
server.listen(3000);

console.log('Server running at http://localhost:3000/');
