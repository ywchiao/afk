/**
 * 接受一個 config 檔的名稱，傳回一個 router 物件。
 *
 * @name config
 * @function
 * @param config - 設定檔 (configuration file) 檔名
 * @returns {Object}
 */
exports.config = (config) => {
    const FS = require('fs')
    const TABLE = {
        // file type
        '.css': 'text/css',
        '.html': 'text/html',
        '.png': 'image/png',
    };

    FS.readFile(config, (err, data) => {
        if (err) {
            console.log(err);
        } // fi
        else {
            const CONTENTS = JSON.parse(data);

            for (key in CONTENTS) {
                TABLE[key] = CONTENTS[key];
            } // od
        } // esle

        console.log('routing_table: ' + JSON.stringify(TABLE, null, 4));
    });

    return {
        route: (request, servant) => {
            const URL = require('url');

            let postData = '';

            request.setEncoding('utf8');

            // 利用 'data' event 消耗掉 data chunk;
            // 'end' event 才會被 fired
            request.on('data', (chunk) => {
                postData += chunk;

                console.log(
                    'Received POST data chunk "' + chunk + '".'
                );
            });

            request.on('end', () => {
                const PATH = require('path');
                const PATHNAME = URL.parse(request.url).pathname;

                console.log('Request for "' + PATHNAME + '" received.');

                if (PATHNAME in TABLE) {
                    const work_path = TABLE[PATHNAME];

                    FS.readFile(work_path, (err, data) => {
                        if (err) {
                            console.log(err);
                        } // fi
                        else {
                            const TYPE = TABLE[PATH.extname(work_path)];

                            servant.serve(TYPE, data);
                        } // esle
                    });
                } // fi
                else {
                    servant.error();
                } // esle
            });
        } // route
    }
};

// router.js.
