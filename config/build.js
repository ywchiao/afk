
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  dest: 'htdocs/js/afk.js',
  format: 'iife',
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ 'es2015', { modules: false } ] ],
      plugins: [ 'external-helpers' ]
    })
  ],
  sourceMap: 'true'
};

// build.js
