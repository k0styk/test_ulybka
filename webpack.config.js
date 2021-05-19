const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const sass = require('./webpack/sass');
const sourceMap = require('./webpack/sourceMap');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const extractCSS = require('./webpack/css.extract');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const source = ph => path.join(__dirname, 'src', ph?ph:'');
const build = ph => path.join(__dirname, 'dist', ph?ph:'');

const common = merge([
  {
    entry: {
      'index': source('server/entrypoint.js')
    },
    output: {
      path: build(),
      publicPath: '/',
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': source(),
        '@views': source('client/views/'),
        '@pages': source('client/pages/'),
        '@client': source('client/'),
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: 'body',
        chunks: ['index', 'common'],
        template: source('public/html/index.html'),
        cache: false
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          'common': {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
  },
  images(),
  babel(),
]);

module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    return merge([
      common,
      extractCSS(),
    ]);
  }
  if (argv.mode === 'development') {
    return merge([
      common,
      sass(),
      sourceMap(webpack)
    ]);
  }
};