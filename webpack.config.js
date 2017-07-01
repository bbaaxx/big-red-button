const path = require('path');
// const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const baseConfig = {
  entry: {
    jsLibs: './src/libs.js',
    styleLibs: './src/styles/libs.scss',
    main: './src/index.js',
    styles: [
      './src/styles/sass.scss',
      './src/styles/sugarss.sss',
      './src/styles/cssnext.css',
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '/dist'),
  },
  module: {
    rules: [
      {
        test: /\.shim\.js$/,
        use: ['script-loader'],
        exclude: nodeModulesPath,
      },
      { // eslint
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
      { // es6 and jsx
        test: /\.(js|jsx)$/,
        exclude: nodeModulesPath,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      { // sass
        test: /\.(sass|scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'resolve-url-loader' },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader?sourceMap' },
        ],
        exclude: /node_modules/,
      },
      { // mdl
        test: require.resolve('material-design-lite/material'),
        loader: 'exports-loader?componentHandler',
      },
      { // sugarss
        test: /\.sss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader', options: { parser: 'sugarss' } },
        ],
      },
      { // cssnext
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
      },
      { // fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader?name=fonts/[name].[ext]',
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
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
].map(target => (
  webpackMerge(baseConfig, {
    target,
    output: {
      path: path.resolve(`${__dirname}/dist/${target}`),
      filename: `[name].${target}.js`,
    },
  })
));

module.exports = targets;
