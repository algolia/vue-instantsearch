#!/bin/sh
set -e

yarn remove vue vue-jest vue-template-compiler babel-preset-es2015
yarn add vue@3.1.2 @vue/server-renderer@3.1.2 vue-jest@5.0.0-alpha.10 vue-loader@16.1.2 jest@26.6.3 babel-jest@26.6.3 @babel/preset-env@7.17.0 @babel/plugin-transform-runtime@7.17.0 -D -E
echo "export * from './index-3';" > src/util/vue-compat/index.js
rm .babelrc
cat <<EOT > babel.config.js
// eslint-disable-next-line import/no-commonjs
module.exports = {
  plugins: ['@babel/plugin-transform-runtime'],
  presets: ['@babel/preset-env'],
};
EOT
