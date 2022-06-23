import babel from '@rollup/plugin-babel';
import nodeExternals from 'rollup-plugin-node-externals';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './index.ts',
  output: [
    {
      dir: 'lib/',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      sourcemap: true,
      generatedCode: 'es2015',
      freeze: false,
      externalLiveBindings: false,
      compact: true,
      exports: 'default',
    },
    {
      dir: 'lib/es',
      entryFileNames: '[name].mjs',
      format: 'es',
      sourcemap: true,
      generatedCode: 'es2015',
      freeze: false,
      externalLiveBindings: false,
      compact: true,
      exports: 'default',
    },
  ],
  treeshake: { moduleSideEffects: false, propertyReadSideEffects: false },
  plugins: [
    nodeExternals(),
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
