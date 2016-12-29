/**
 *  @file       httpd.js
 *  @brief      The configurable httpd server.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       11/04/2016 created.
 *  @date       12/28/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
 *  @details
 *
 *  The configurable httpd server.
 */
'use strict';

/**
 * 依據 config 檔的內容，建立並傳回一個 http.Server 物件
 *
 * @name config
 * @function
 * @param config - httpd server 設定檔名稱
 * @returns {http.Server}
 */
exports.config = (config) => {
  const HTTP = require('http');
  const ROUTER = require('./router.js').config(config);

  return HTTP.createServer((request, response) => {
    const SERVANT = require('./response.js').config(response);

    ROUTER.route(request, SERVANT);
  });
};

// httpd.js
