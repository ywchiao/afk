exports.config = (config) => {
    return {
        // file type
        '.css': 'text/css',
        '.html': 'text/html',
        '.png': 'image/png',

        // route
        '/': '../htdocs/index.html',
        '/css/styles.css': '../htdocs/css/styles.css',
        '/png/preview2.png': '../htdocs/png/preview2.png',
    };
};

// router.js.
