var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/js/apps/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename:'contact.html',
      template: path.join(__dirname, '/src/templates/contact.jade')
    }),
    new HtmlWebpackPlugin({
      filename:'order.html',
      template: path.join(__dirname, '/src/templates/order.jade')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/templates/main.jade')
    }),
    new ExtractTextPlugin("style.css")
  ],
  module: {
    loaders: [
    {
      test: /\.jade$/,
      loader: 'html!jade-html'
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!less')
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader:'file'
    },
    {
      test: /\.(woff|woff2|ttf|eot)$/,
      loader:'file'
    },
    {
      test: /\.js$/,
      loader: 'react-hot!babel'
      include: path.join(__dirname, '/src/js')
    }
    ]
  }
};
