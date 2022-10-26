var fs = require('fs');
fs.readFile('./pipe.js','utf8', function (er, data) {
    console.log(data);
})
console.log("Hello world!");