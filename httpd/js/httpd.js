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
