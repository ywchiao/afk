/**
 *  @file       router.js
 *  @brief      The request handler for afk daemon.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       10/27/2016 created.
 *  @date       12/28/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
 *  @details
 *
 *  The request handler for the afk daemon.
 */
'use strict';

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
  const PREFIX = '../htdocs/json/';
  const TABLE = {
    // file type
    '.css': 'text/css',
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
  };

  FS.readdir(PREFIX, (err, files) => {
    if (err) {
      console.log(err);
    }
    else {
      files.forEach((file) => {
        TABLE['/' + file] = PREFIX + file;
      });
    }
  });

  FS.readFile(config, (err, data) => {
    if (err) {
      console.log(err);
    } // fi
    else {
      const CONTENTS = JSON.parse(data);

      for (var key in CONTENTS) {
        TABLE[key] = CONTENTS[key];
      } // od
    } // esle

    console.log('routing_table: ' + JSON.stringify(TABLE, null, 2));
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
          'Received POST data chunk: [' + chunk + '].'
        );
      });

      request.on('end', () => {
        const PATHNAME = URL.parse(request.url).pathname;
        const PROCESS = require('./process.js');
        const STATIC = require('./static.js');

        console.log('Request for "' + PATHNAME + '" received.');

        switch (request.method) {
          case 'POST':
            const data = JSON.parse(postData);

            PROCESS.serve(PATHNAME, data, servant);

            break;
            
          case 'GET':
            if (PATHNAME in TABLE) {
              STATIC.serve(TABLE[PATHNAME], TABLE, servant);
            }
            else {
              let data = (postData) ? JSON.parse(postData) : null;

              PROCESS.serve(PATHNAME, data, servant);
            }

            break;

          default:
            console.log('no suitable services found!');
        }
      });
    } // route
  }
}

// router.js
