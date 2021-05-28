import vueV2 from 'rollup-plugin-vue2';
import vueV3 from 'rollup-plugin-vue3';
import buble from 'rollup-plugin-buble';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import fs from 'fs';

const processEnv = conf => ({
  // parenthesis to avoid syntax errors in places where {} is interpreted as a block
  'process.env': `(${JSON.stringify(conf)})`,
});

const makeConfigs = ({ vuePlugin, outputDir }) => {
  const plugins = [
    vuePlugin({ compileTemplate: true, css: false }),
    commonjs(),
    json(),
    buble({
      transforms: {
        dangerousForOf: true,
      },
    }),
    replace(processEnv({ NODE_ENV: 'production' })),
    terser({
      sourcemap: true,
    }),
    filesize(),
  ];

  return [
    {
      input: 'src/instantsearch.js',
      external: [
        'algoliasearch-helper',
        'instantsearch.js/es',
        'instantsearch.js/es/connectors',
        'vue',
      ],
      output: [
        {
          sourcemap: true,
          file: `${outputDir}/cjs/index.js`,
          format: 'cjs',
          exports: 'named',
        },
      ],
      plugins: [...plugins],
    },
    {
      input: 'src/instantsearch.js',
      external: [
        'algoliasearch-helper',
        'instantsearch.js/es',
        'instantsearch.js/es/connectors',
        'vue',
      ],
      output: [
        {
          sourcemap: true,
          dir: `${outputDir}/es`,
          format: 'es',
        },
      ],
      preserveModules: true,
      plugins: [...plugins],
    },
    {
      input: 'src/instantsearch.umd.js',
      external: ['vue'],
      output: [
        {
          sourcemap: true,
          file: `${outputDir}/umd/index.js`,
          format: 'umd',
          name: 'VueInstantSearch',
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      ],
      plugins: [
        ...plugins,
        resolve({
          browser: true,
          preferBuiltins: false,
        }),
      ],
    },
  ];
};

export default [
  ...makeConfigs({
    vuePlugin: vueV2,
    outputDir: 'dist/vue2',
  }),
  ...makeConfigs({
    vuePlugin: vueV3,
    outputDir: 'dist/vue3',
  }),
];
