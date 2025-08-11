import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/lib/index.js',
  output: [
    {
      file: 'src/lib/dist/js/index.js',
      format: 'cjs',
      sourcemap: !isProduction
    },
    {
      file: 'src/lib/dist/js/index.esm.js',
      format: 'esm',
      sourcemap: !isProduction
    },
    {
      file: 'src/lib/dist/js/index.umd.js',
      format: 'umd',
      name: 'CharacterLibrary',
      sourcemap: !isProduction
    }
  ],
  plugins: [
    resolve({
      browser: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['> 1%', 'last 2 versions']
          }
        }]
      ]
    }),
    css({
      output: 'src/lib/dist/css/character-library.css'
    }),
    isProduction && terser()
  ].filter(Boolean),
  external: isProduction ? ['react', 'vue'] : []
};
