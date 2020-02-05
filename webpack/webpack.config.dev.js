const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    inline: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../src'),
        loader: 'babel-loader'
      },
      {
        test:  /\.(css|s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap=true', 
        {
          loader: "postcss-loader",
          options: {
            ident: 'postcss',
            plugins: [
              require('autoprefixer')({
                yoverrideBrowserslist: ['last 1 chrome version',
                  'last 1 firefox version',
                  'last 1 edge version']
              }),
            ]
          }
        },
        'sass-loader']
      }
    ]
  }
});
