var http = require('http');
var handler = function (request, result) {
    d = new Date();
    var url = request.url;
    var body = 'Hello World';


    result.writeHead(200, {'Content-Type': 'text/html'});
    result.end(' <!DOCTYPE html>'+
        '<html>'+
        '<head>'+
        '<title>Page Title</title>'+
    '</head>'+
    '<body>'+

   ' <h1>This is a Heading</h1>'+
            

    '</body>'+
   ' </html> ');
}


var server = http.createServer(handler);
server.listen(3000);

console.log('Server running at http://localhost:3000/');
