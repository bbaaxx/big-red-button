const merge = require('webpack-merge');
const webpack = require('webpack');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || true)),
};

module.exports = merge(config, {
  devtool: 'source-map',
  entry: {
    application: [
      'webpack-hot-middleware/client',
      'webpack/hot/dev-server',
      'babel-polyfill',
      'client/index.js',
    ],
    styles: [
      'client/styles/sass.scss',
      'client/styles/sugarss.sss',
      'client/styles/cssnext.css',
    ],
    jslibs: ['client/libs.js'],
    styleLibs: ['client/styles/libs.scss'],
  },
  // entry: {
  //   application: [
  //     'webpack-hot-middleware/client',
  //     'babel-polyfill',
  //     'client/js/index',
  //   ],
  //   vendor: [
  //     'bootstrap',
  //     '@webcomponents/webcomponentsjs/custom-elements-es5-adapter',
  //     '@webcomponents/webcomponentsjs/webcomponents-loader',
  //     'web-component',
  //   ],
  // },
  plugins: [
    new FlowBabelWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      cache: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
  ],
});
