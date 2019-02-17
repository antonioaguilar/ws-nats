import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: [
      // { file: 'dist/' + pkg.name + '.esm.js', format: 'es' },
      { file: 'dist/' + pkg.name + '.umd.js', format: 'umd', name: 'NATS' }
    ],
    plugins: [
      builtins(),
      commonjs(),
      globals(),
      uglify()
    ]
  }
];

