
var http = require('http');
var handler = function (request, result) {

    d = new Date();
    var url = request.url;
    result.writeHead(200, {'Content-Type': 'text/plain'});
    result.end('Hello World '+url);
}


var server = http.createServer(handler);
server.listen(3000);

console.log('Server running at http://localhost:3000/');

