/**
 *  @file       static.js
 *  @brief      The static file handler for the afk daemon.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       12/15/2016 created.
 *  @date       12/16/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
 *  @details
 *
 *  The static file handler for the afk daemon.
 */
'use strict';

module.exports = {
  serve: (path, table, servant) => {
    const FS = require('fs');
    const PATH = require('path');

    FS.readFile(path, (err, data) => {
      if (err) {
        console.log(err);
      } // fi
      else {
        const TYPE = table[PATH.extname(path)];

        servant.serve(TYPE, data);
      } // esle
    });
  }
}

// static.js
