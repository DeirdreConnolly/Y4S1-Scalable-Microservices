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
                students.push(obj.firstname + ' '
                    + obj.lastname + ' '
                    + obj.address + ' '
                    + obj.phone + ' '
                    + obj.mark + ' '
                    + obj.nationality);
                // students.join(' ')
                console.log(students)
                res.writeHead(200, {'Content-Type': 'text/html '});
                res.end(' <!DOCTYPE html>' +
                    '<html>' +
                    '<head>' +
                    '<title>Student Details</title>' +
                    '</head>' +
                    '<body>' +

                    '<h2>Name: ' + obj.firstname + ' ' + obj.lastname + '</h2>' +
                    '<h2>Address: ' + obj.address + '</h2>' +
                    '<h2>Phone: ' + obj.phone + '</h2>' +
                    '<h2>Mark: ' + obj.mark + '</h2>' +
                    '<h2>Nationality: ' + obj.nationality + '</h2>' + '<br>' +

                    '<form method="post" action="http://localhost:3000/student.html">' +
                    '<input type="submit" value="Submit Another Student">' +
                    '</form>' + '<br>' +

                    '<form method="get" action="http://localhost:3000/listStudents">' +
                    '<input type="submit" value="List All Students">' +
                    '</form>' + '<br>' +

                    '<form method="get" action="http://localhost:3000/showStudent">' +
                    '<input type="submit" value="Search Student by ID">' +
                    '</form>' + '<br>' +

                    '<form method="get" action="http://localhost:3000/deleteStudent">' +
                    '<input type="submit" value="Delete Student Record">' +
                    '</form>' +
                    
                    '</body>' +
                    '</html> ');


            });
            return students;
        }

    } else if ('/listStudents?' == req.url) {

        if (req.method == 'GET') {

            var i;
            var html = '<html><head><title>Student List</title></head><body>' +
                '<h1>Student List</h1><ol>';

            for (i = 0; i < students.length; i++) {
                html += '<li>' + students[i] + '</li>';
            }

            html += '</ol>' +
                '<form method="post" action="/">' +
                '</form> ' +

                '<form method="post" action="http://localhost:3000/student.html">' +
                '<input type="submit" value="Submit Another Student">' +
                '</form>' +

                '<form method="get" action="http://localhost:3000/showStudent">' +
                '<input type="submit" value="Search Student by ID">' +
                '</form>' +

                '<form method="get" action="http://localhost:3000/deleteStudent">' +
                '<input type="submit" value="Delete Student Record">' +
                '</form>' +

                '</body></html>';

            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Content-Length', Buffer.byteLength(html));
            res.end(html);
        }

    } else if ('/showStudent?' == req.url) {

        if (req.method == 'GET') {

            var obj = qs.parse(body);
            var i;
            var html = '<html><head><title>Search Student by ID</title></head><body>' +
                '<h1>Search Student by ID</h1><ul>';

            html += '</ul>' +
                '<form method="post" action="/">' +
                '</form> ' + '<br>' +

                '<form method="get" action="http://localhost:3000/showStudent">' +
                'Student ID:' + '<br>' +
                '<input type="text" name="id">' + '<br><br>' +

                '<input type="submit" value="Search by ID">' +
                '</form>' +

                // When user types ID into search bar and clicks search button
                // Scan student array
                // Find array element at position of searchID given
                // Output student details of given ID
                // myArray.find(x => x.id === '45').foo;
                '<script>(students.find(obj => obj.id === id)</script>' +

                '<h2>Name: ' + obj.firstname + ' ' + obj.lastname + '</h2>' +
                '<h2>Address: ' + obj.address + '</h2>' +
                '<h2>Phone: ' + obj.phone + '</h2>' +
                '<h2>Mark: ' + obj.mark + '</h2>' +
                '<h2>Nationality: ' + obj.nationality + '</h2>' + '<br>' +

                '<form method="post" action="http://localhost:3000/student.html">' +
                '<input type="submit" value="Submit Another Student">' +
                '</form>' +

                '<form method="get" action="http://localhost:3000/listStudents">' +
                '<input type="submit" value="List All Students">' +
                '</form>' +

                '<form method="get" action="http://localhost:3000/deleteStudent">' +
                '<input type="submit" value="Delete Student Record">' +
                '</form>' +

                '</body></html>';

            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Content-Length', Buffer.byteLength(html));
            res.end(html);
        }


    } else if ('/deleteStudent?' == req.url) {

        if (req.method == 'GET') {

            // EXAMPLE
            // var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
            // var url = new URL(url_string);
            // var c = url.searchParams.get("c");
            // console.log(c);

            // LECTURE NOTES
            // case 'DELETE':
            //     var path = url.parse(req.url).pathname;
            //     var i = parseInt(path.slice(1), 10);
            //     // Check that number is valid
            //     if (!items[i]) {
            //         res.statusCode = 404;
            //         res.end('Item not found');}
            //     else {
            //         // Delete requested item
            //         items.splice(i, 1);
            //         res.end('OK\n');}
            //     break;

            var html = '<html><head><title>Delete Student Record</title></head><body>' +
                '<h1>Delete Student Record</h1><ul>';

            html += '</ul>' +
                '<form method="post" action="/">' +
                '</form> ' + '<br>' +

                '<form method="get" action="http://localhost:3000/deleteStudent">' +
                'Student ID:' + '<br>' +
                '<input type="text" name="id">' + '<br><br>' +

                '<input type="submit" value="Delete Student Record">' +
                '</form>' +

                // fName, lName, address, phone, mark, nationality = 6
                //
                // '<script>for (var i = 0; i < students.length; i++) {\n' +
                // '                    if (students[i] === id) {\n' +
                // '                        students.splice(i, 6);\n' +
                // '                        i--;\n' +
                // '                    }\n' +
                // '                }</script>' +
                //
                // '<script>(students.splice(id, 6)</script>' +

                '<script>' +
                    '// Check that number is valid\n' +
                    'if (!students[id]) {\n' +
                        'res.statusCode = 404;\n' +
                        'res.end(\'Item not found\');\n' +
                    '} else {\n' +
                        '// Delete requested item\n' +
                        'students.splice(id, 6);\n' +
                        'res.end(\'OK\\n\');\n' +
                    ' }' +
                '</script>' +

                '<form method="post" action="http://localhost:3000/student.html">' +
                '<input type="submit" value="Submit Another Student">' +
                '</form>' +

                '<form method="get" action="http://localhost:3000/listStudents">' +
                '<input type="submit" value="List All Students">' +
                '</form>' + '<br>' +

                '</body></html>';

            // res.setHeader('Content-Type', 'text/html');
            // res.setHeader('Content-Length', Buffer.byteLength(html));
            res.end(html);
        }

    } else {

        var path;

        path = p.join(root, "/student.html");

        console.log("serving " + path);
        var stream = fs.createReadStream(path);

        stream.on('data', function (chunk) {
            res.write(chunk);
        });
        stream.on('end', function () {
            res.end();
        });
        stream.on('error', function (err) {
            res.end('');
        });
    }

});

server.listen(3000);

