var http = require('http');
var url = require('url');
// The data store is a regularJavaScript Array in memory.
var items = [];

var server = http.createServer(function (req, res) {
    //  req.method is the HTTP method requested.
    switch (req.method) {
        case 'POST':
            var item = '';
            //  Encode incoming data events as UTF-8 strings.
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
                // Concatenate data chunk onto the buffer.
                item += chunk;
                console.log('chunk' +chunk);
            });

            req.on('end', function () {
                //  Push complete new item onto the items array.
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            var i=0;
            for (;i<items.length;i++)
            {
                res.write(i + ') ' + items[i] + '\n');
            }
            res.end();
            break;
        // Add DELETE case to the switch statement
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var i = parseInt(path.slice(1), 10);
            //Check that number is valid
            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('Invalid item id');
                // Ensure requested index exists
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('Item not found');
            } else {
                // Delete requested item
                items.splice(i, 1);
                res.end('OK\n');
            }
            break;
    }
});
server.listen(3000);