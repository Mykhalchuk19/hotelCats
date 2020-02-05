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
    new CopyWebpackPlugin([{ from: Path.resolve(__dirname, '../public'), to: 'public' },
    /*{ from: Path.resolve(__dirname, '../src/assets'), to: '/src/assets' }*/]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: Path.resolve(__dirname, '../src/index.html'),
      chunks: ["index"],
      minify: {
        collapseWhitespace: false
    }
    }),
    new HtmlWebpackPlugin({
      filename: "catalog.html",
      template: Path.resolve(__dirname, '../src/catalog.html'),
      chunks: ["index", "catalog"],
      minify: {
        collapseWhitespace: false
    }
    }),
    new HtmlWebpackPlugin({
      filename: "card.html",
      template: Path.resolve(__dirname, '../src/card.html'),
      chunks: ["index"],
      minify: {
        collapseWhitespace: false
    }
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
