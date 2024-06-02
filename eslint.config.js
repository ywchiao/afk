/**
 * eslint.config.js
 */

import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: [
      'src/**/*.js',
    ],
    ignores: [
    ],
    languageOptions: {
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    plugins: {
    },
    rules: {
    }
  }
];

// .eslintrc.js
