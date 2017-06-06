const path = require('path');
// const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const baseConfig = {
  entry: {
    // libs: './libs.js',
    main: './index.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: nodeModulesPath,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: nodeModulesPath,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ]
      },
    ],
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    new HtmlWebpackPlugin(),
    new WebpackManifestPlugin(),
    // why can't I use arrows ?
    function customPlugin() {
      // must reference this ?
      this.plugin('done', () => {
        console.log('weehee');
      });
    },
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: true,
    port: 3010,
  },
  devtool: 'cheap-eval-source-map',
};

const targets = [
  // 'web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron-main'
  'web',
].map((target) => {
  const base = webpackMerge(baseConfig, {
    target,
    output: {
      path: path.resolve(`${__dirname}dist/${target}`),
      filename: `[name].${target}.js`,
    },
  });
  return base;
});

module.exports = targets;
