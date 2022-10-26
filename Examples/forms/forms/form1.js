var http = require('http');
var qs = require('querystring');
var items = [];
var server = http.createServer(function (req, res) {
    var url = req.url;
    console.log('request ' + url + 'method ' + req.method);

    // if the request is for the user resource and is a post
    // http method
    if (req.url == '/user' && req.method == 'POST') {
        var body = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
            body += chunk;
            console.log('got chunk '+chunk);
        });
        req.on('end', function () {
            var obj = qs.parse(body);
            console.log('firstname ' + obj.firstname);
            console.log('lastname ' + obj.lastname);
        });
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World ');
    }

});
server.listen(3000);
