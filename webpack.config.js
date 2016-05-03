var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/js/apps/MainApp'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.tmpl.html')
    })
  ],
  module: {
    loaders: [
    {
      test: /\.html$/,
      loader: 'html'
    },
    {
      test: /\.less$/,
      loader:'style!css!less',
      include: path.join(__dirname, '/src/styles')
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
      loader: 'react-hot!babel',
      include: path.join(__dirname, '/src/js')
    }]
  }
};
