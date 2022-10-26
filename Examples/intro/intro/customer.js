var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    getCustomers(res);
}).listen(3000);

function getCustomers(res) {
    fs.readFile('./customer.json', function (err, data) {
        if (err) {
            hadError(err, res);
        }
        else {

            var customer = JSON.parse(data.toString());
            res.end(' <!DOCTYPE html>'+
                '<html>'+
                '<head>'+
                '<title>Page Title</title>'+
                '</head>'+
                '<body>'+

                ' <h1>Load a Customer</h1>'+

                '<p> name is:'  +customer.firstName+
                '</p>'+
                '</body>'+
                ' </html> ');
        }
    })
}
