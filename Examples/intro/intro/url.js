
var http = require('http');
var url = require("url");
var handler = function (request, result) {
    var url1 = request.url;
    console.log('url = '+url1);
    var parsedUrl = url.parse(url1,true,true);
  //  console.log('Path is : ',parsedUrl.path);
   // console.log('Pathname is : ',parsedUrl.pathname);
    //console.log('Search is : ',parsedUrl.search);
    console.log('Query is : ',parsedUrl.query);
    result.writeHead(200, {'Content-Type': 'text/plain'});
    result.end('You requested '+url1);
}


var server = http.createServer(handler);
server.listen(3000);

console.log('Server running at http://localhost:3000/');
