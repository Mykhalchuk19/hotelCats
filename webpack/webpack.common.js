const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
//const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: {
    index: Path.resolve(__dirname, '../src/scripts/index.js'),
    catalog: Path.resolve(__dirname, '../src/scripts/catalog.js'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: Path.resolve(__dirname, '../public'), to: 'public' }]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: Path.resolve(__dirname, '../src/html/index.html'),
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "catalog.html",
      template: Path.resolve(__dirname, '../src/html/catalog.html'),
      chunks: ["index", "catalog"]
    }),
    new HtmlWebpackPlugin({
      filename: "card.html",
      template: Path.resolve(__dirname, '../src/html/card.html'),
      chunks: ["index"]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: false,
        },
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: '$',
          },
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
};
