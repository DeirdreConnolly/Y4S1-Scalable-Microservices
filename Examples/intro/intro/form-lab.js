var http = require('http');
var qs = require('querystring');
var u = require('url');
var p = require('path');
var fs = require('fs');
var students = [];
var root = __dirname;
var server = http.createServer(function (req, res) {
    var url = req.url;
    console.log('request ' + url + ' method ' + req.method);
    if ('/addStudent' == req.url) {
        if (req.method == 'POST') {
            var body = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                body += chunk
            });
            req.on('end', function () {
                var obj = qs.parse(body);
                console.log('firstname ' + obj.firstname);
                console.log('lastname ' + obj.lastname);
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

    }
    if ('/ListStudents' == req.url) {
        if (req.method == 'GET') {
            res.end(' <!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<title>Page Title</title>' +
                '</head>' +
                '<body>' +

                ' <h1>YList all students </h1>' +


                '</body>' +
                ' </html> ');
        }
    }
    else {
        var path;

        path=p.join(root, "/student.html");

        console.log("serving " + path);
        var stream = fs.createReadStream(path);

        stream.on('data', function (chunk) {
            res.write(chunk);
        });
        stream.on('end', function () {
            res.end();
        });
        stream.on('error', function(err){
            res.end('');
        });
    }

});
server.listen(3000);

