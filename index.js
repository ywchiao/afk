var http = require('http');

http.createServer((request, response) => {
    let servant = require('./response.js').ctor(response);
    let fs = require('fs');

    fs.readFile('index.html', (err, data) => {
        if (err) {
            servant.error();
            console.log(err);
        }
        else {
            servant.serve('text/html', data);
        }
    });
}).listen(8081);

// log message to Console
console.log('Server running at http://127.0.0.1:8081/');

// index.js.
