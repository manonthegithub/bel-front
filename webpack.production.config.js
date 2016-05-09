var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var lessPlugin = new ExtractTextPlugin("styles.css", {
    allChunks: true
});


module.exports = [
{
  entry: [
    './src/js/apps/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:'boxes.html',
      template: path.join(__dirname, '/src/templates/boxes.jade')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/templates/main.jade')
    }),
    new HtmlWebpackPlugin({
      filename:'contact.html',
      template: path.join(__dirname, '/src/templates/contact.jade')
    }),
    new CleanWebpackPlugin(['dist'], {
      verbose: true
    }),
    lessPlugin
  ],
  module: {
    loaders: [
    {
      test: /\.jade$/,
      loader: 'html?attrs=img:src link:href!jade-html'
    },
    {
      test: /\.less$/i,
      loader: lessPlugin.extract('style', 'css!less')
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
      loader: 'babel',
      include: path.join(__dirname, '/src/js')
    },
    {
      test: /\.css$/,
      loader: 'style!css'
    }
    ]
  }
}];
