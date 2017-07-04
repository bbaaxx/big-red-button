// const merge = require('webpack-merge');
// const webpack = require('webpack');
const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || true)),
};

console.log(GLOBALS);

module.exports = config;
