
import babel from "@rollup/plugin-babel";

export default {
  "input": "src/index.js",
  "output": {
    "file": "htdocs/js/afk.js",
    "format": "iife",
    "sourcemap": "true",
  },
  "plugins": [
    babel({
      "babelrc": false,
      "babelHelpers": "bundled",
      "exclude": "node_modules/**",
      "presets": [
        [
          "@babel/preset-env",
          {
            "useBuiltIns": "entry",
            "corejs": 3,
          }
        ],
      ],
      "plugins": [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread",
      ],
    })
  ],
};

// rollup.config.js
