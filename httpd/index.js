/**
 *  @file       index.js
 *  @brief      The entry function of the httpd.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       09/21/2016 created.
 *  @date       12/28/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
 *  @details
 *
 *  The entry function of the httpd.
 */
'use strict';

/**
 * httpd 程序進入點
 *
 * @returns {undefined}
 */
(() => {
  const HTTPD = require('./js/httpd').config('./config.json');

  HTTPD.listen(8081);

  // log message to Console
  console.log('Server running at http://127.0.0.1:8081/');
})();

// index.js.
