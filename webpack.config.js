const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

const baseConfig = {
    entry: {
      // libs: './libs.js',
      main: './index.js'
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [
                  {
                    loader: 'eslint-loader',
                    options: {
                      failOnError: true
                    }
                  }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [
                  {loader: 'babel-loader'},
                ]
            }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new WebpackManifestPlugin(),
      // why can't I use arrows ?
      function() {
        // must reference this ?
        this.plugin('done', (stats) => {
          console.log('weehee');
        });
      }
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      overlay: true,
      port: 3010
    },
    devtool: 'cheap-eval-source-map'
}

let targets = [
  // 'web', 'webworker', 'node', 'async-node', 'node-webkit', 'electron-main'
  'web'
].map((target) => {
  let base = webpackMerge(baseConfig, {
    target: target,
    output: {
      path: path.resolve(__dirname, 'dist/' + target),
      filename: '[name].' + target + '.js'
    }
  });
  return base;
});

module.exports = targets;
