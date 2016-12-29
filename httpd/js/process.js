/**
 *  @file       process.js
 *  @brief      The request handler for afk daemon.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       12/16/2016 created.
 *  @date       12/28/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
 *  @details
 *
 *  The request handler for the afk daemon.
 */
'use strict';

module.exports = {
  serve: (path, data, servant) => {
    const FS = require('fs');
    const prefix = '../htdocs/json/';

    switch (path) {
      case '/save':
        let map = JSON.stringify(data, null, 2);

        FS.writeFile(prefix + data.name + '.json', map, 'utf8', (err) => {
          if (err) {
            console.log(err);
          }

          servant.serve('text/plain', 'OK');
        });

        break;

      case '/map_list':
        let list = JSON.stringify(data, null, 2);

        FS.readdir(prefix, (err, files) => {
          if (err) {
            console.log(err);
          }
          else {
            servant.serve('application/json', JSON.stringify(files));
          }
        });

        break;

      default:
        servant.error();

        break;
    }
  }
}

// process.js
