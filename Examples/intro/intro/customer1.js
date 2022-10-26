var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    getTitles(res);
}).listen(8000, "127.0.0.1");

function getTitles(res) {
    fs.readFile('./customer1.json', function (err, data) {
        if (err) {
            hadError(err, res);
        }
        else {

            var customerArray = JSON.parse(data.toString());
            var str = ' <!DOCTYPE html>'+
                '<html>'+
                '<head>'+
                '<title>Page Title</title>'+
                '</head>'+
                '<body>'+

                ' <h1>Customers</h1>';
            for (i=0;i<customerArray.length;i++){
                str+='<ul>';
                str+= '<li> name: '+customerArray[i].firstName+'</li>';
                str+= '<li> age: '+customerArray[i].age+'</li>';
                str+='</ul>';
            }


            str +=
                '</body>'+
                ' </html> ';
            res.end(str);
        }
    })
}
