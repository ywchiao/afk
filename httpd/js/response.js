/**
 *  @file       response.js
 *  @brief      The request handler for afk daemon.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       10/17/2016 created.
 *  @date       12/28/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
 *  @details
 *
 *  The request handler for the afk daemon.
 */
'use strict';

/**
 * 接受一個 http.ServerResponse 物件，傳回一個 servant 物件
 *
 * @name config
 * @function
 * @param response - 'request' event 的 'http.ServerResponse' 物件
 * @returns {Object}
 */
exports.config = (response) => {
  /**
   * 利用 http.ServerResponse 物件回傳訊息
   *
   * @name ack
   * @function
   * @param code - http 狀態碼
   * @param type - http content-type
   * @param data - 訊息內容
   * @returns {undefined}
   */
  function ack(code, type, data) {
    response.writeHead(code, {
      'Content-Type': type
    });

    response.write(data);
    response.end();
  } // ack()

  return {
    error: () => {
      ack(404, 'text/plain', 'Page Not Found!\n')
    }, // error

    serve: (type, data) => {
      ack(200, type, data);
    } // serve
  };
}; // config()

// response.js
