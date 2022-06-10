import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './index.ts',
  output: {
    dir: './lib/',
    format: 'cjs',
    sourcemap: false,
    freeze: false,
    compact: true,
    exports: 'auto',
  },
  external: [/@babel\/runtime-corejs3/i, 'react'],
  treeshake: { moduleSideEffects: false, propertyReadSideEffects: false },
  plugins: [
    babel({
      babelrc: true,
      babelHelpers: 'runtime',
      extensions: ['.js', '.ts'],
      exclude: [/\.test\.ts/i, /node_modules\//i],
    }),
    replace({
      preventAssignment: false,
      ENVIRONMENT: JSON.stringify('production'),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    terser({
      toplevel: true,
      mangle: { properties: { regex: /^__/ } },
      ecma: 2015,
      compress: {
        arguments: true,
        booleans_as_integers: true,
        hoist_funs: true,
        passes: 3,
        toplevel: true,
        pure_funcs: ['console.info', 'console.debug', 'console.warn'],
      },
    }),
  ],
};