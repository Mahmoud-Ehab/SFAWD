// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs'
      },
      {
        file: 'dist/index.es.js',
        format: 'es'
      },
    ],
    external: ['sfawd', "serve-handler", 'fs', 'http'],
    plugins: [
      commonjs(),
      typescript(),
      json()
    ],
  },
];