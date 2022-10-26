

var http = require('http');
var u = require('url');
var p = require('path');
var fs = require('fs');
var root = __dirname;

var server = http.createServer(function(req, res){
    var url = u.parse(req.url);
    var path = p.join(root, url.pathname);
    console.log("serving "+path);
    var stream = fs.createReadStream(path);

    stream.on('data', function(chunk){
        res.write(chunk);
    });
    stream.on('end', function(){
        res.end();
    });
   stream.on('error', function(err){
        res.statusCode = 500;
        res.end('Internal Server Error');
    });
});
server.listen(3000);


