const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const nodeExternals = require('webpack-node-externals');

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';

const createApiFile = TARGET_NODE
  ? './create-api-server.js'
  : './create-api-client.js';

const target = TARGET_NODE ? 'server' : 'client';

module.exports = {
  configureWebpack: () => ({
    entry: `./src/entry-${target}`,
    target: TARGET_NODE ? 'node' : 'web',
    node: TARGET_NODE ? undefined : false,
    plugins: [
      TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin(),
    ],
    externals: TARGET_NODE
      ? nodeExternals({
          whitelist: /\.css$/,
        })
      : undefined,
    output: {
      libraryTarget: TARGET_NODE ? 'commonjs2' : undefined,
    },
    optimization: {
      splitChunks: undefined,
    },
    resolve: {
      alias: {
        'create-api': createApiFile,
      },
    },
  }),
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options =>
        Object.assign(options, {
          optimizeSSR: false,
        })
      );
  },
};
