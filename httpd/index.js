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
