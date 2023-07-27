// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: './src/backend/Database/index.ts',
    output: [
      {
        file: 'dist/b.database.js',
        format: 'cjs'
      },
      {
        file: 'dist/b.database.es.js',
        format: 'es'
      },
    ],
    plugins: [
      typescript(),
      nodeResolve({
        preferBuiltins: true  
      })
    ]
  },
  {
    input: './src/backend/Server/index.ts',
    output: [
      {
        file: 'dist/b.server.js',
        format: 'cjs'
      },
      {
        file: 'dist/b.server.es.js',
        format: 'es'
      },
    ],
    plugins: [
      typescript(),
      nodeResolve({
        preferBuiltins: true  
      })
    ]
  },


  {
    input: './src/frontend/RequestDispatcher/index.ts',
    output: [
      {
        file: 'dist/f.rd.js',
        format: 'cjs'
      },
      {
        file: 'dist/f.rd.es.js',
        format: 'es'
      },
    ],
    plugins: [
      typescript(),
      nodeResolve({
        preferBuiltins: true  
      })
    ]
  },
  {
    input: './src/frontend/StateManager/index.ts',
    output: [
      {
        file: 'dist/f.sm.js',
        format: 'cjs'
      },
      {
        file: 'dist/f.sm.es.js',
        format: 'es'
      },
    ],
    plugins: [
      typescript(),
      nodeResolve({
        preferBuiltins: true  
      })
    ]
  },
  {
    input: './src/frontend/UIPainter/index.ts',
    output: [
      {
        file: 'dist/f.ui.js',
        format: 'cjs'
      },
      {
        file: 'dist/f.ui.es.js',
        format: 'es'
      },
    ],
    plugins: [
      typescript(),
      nodeResolve({
        preferBuiltins: true  
      })
    ]
  },
];