var http = require('http');
var qs = require('querystring');
var items = [];
var server = http.createServer(function (req, res) {
    var url = req.url;
    console.log('request ' + url + 'method ' + req.method);
    if ('/user' == req.url) {
        if (req.method == 'POST') {
            var body = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                body += chunk
                console.log('got chunk ' + chunk);
            });
            req.on('end', function () {
                console.log('body ' + body);
                var obj = qs.parse(body);
                console.log('firstname' + obj.firstname);
                console.log('firstname' + obj.lastname);
                res.writeHead(200, {'Content-Type': 'text/html '});
                res.end(' <!DOCTYPE html>' +
                    '<html>' +
                    '<head>' +
                    '<title>Page Title</title>' +
                    '</head>' +
                    '<body>' +

                    ' <h1>Your First Name is ' + obj.firstname + '</h1>' +
                    ' <h1>Your last name is ' + obj.lastname + '</h1>' +

                    '</body>' +
                    ' </html> ');
            });
        }

    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World ');
    }

});
server.listen(3000);
