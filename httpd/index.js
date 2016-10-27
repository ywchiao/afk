var http = require('http');

http.createServer((request, response) => {
    let fs = require('fs')
    let path = require('path');
    let url = require('url');
    let servant = require('./js/response.js').ctor(response);
    let routing_table = require('./js/router.js').config();

    // 利用 'data' event 消耗掉 data chunk;
    // 'end' event 才會被 fired
    request.on('data', (chunk) => {
        console.log('data chunk: ' + chunk);
    });
    
    request.on('end', () => {
        let pathname = url.parse(request.url).pathname;

        if (pathname in routing_table) {
            let work_path = routing_table[pathname];

            fs.readFile(work_path, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    let type = routing_table[path.extname(work_path)];

                    servant.serve(type, data);
                }
            });
        }
        else {
            servant.error();
        }
    });
}).listen(8081);

// log message to Console
console.log('Server running at http://127.0.0.1:8081/');

// index.js.
