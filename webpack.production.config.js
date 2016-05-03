var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
// {
//   entry: [
//     './src/js/productViewComponent'
//   ],
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: 'bundle2.js'
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, '/src/indextest.tmpl.html')
//     })
//   ],
//   module: {
//     loaders: [
//     {
//       test: /\.jpg$/,
//       loader: 'file',
//       include: path.join(__dirname, '/src/img')
//     },
//     {
//       test: /\.js$/,
//       loaders: ['babel'],
//       include: path.join(__dirname, '/src/js')
//     }]
//   }
// },
{
  entry: [
    './src/js/apps/MainApp'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
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
      loader: 'babel',
      include: path.join(__dirname, '/src/js')
    }]
  }
}];
