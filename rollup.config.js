
import babel from 'rollup-plugin-babel';

export default {
  "input": "src/index.js",
  "output": {
    "file": "htdocs/js/afk.js",
    "format": "iife",
    "sourcemap": "true",
  },
  "plugins": [
    babel({
      "exclude": 'node_modules/**',
    })
  ],
};

// rollup.config.js
