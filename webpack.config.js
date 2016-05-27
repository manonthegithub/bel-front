var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var lessPlugin = new ExtractTextPlugin("style-[hash].css", {
    allChunks: true
});


module.exports = {
  contentBase: path.join(__dirname, 'src'),
  devtool: 'eval-source-map',
  entry: {
    index: ['./src/js/apps/index','webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'],
    order: './src/js/apps/order',
    boxes: './src/js/apps/boxes',
    contact: './src/js/apps/contact'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:'order.html',
      chunks: ['order','commons'],
      template: path.join(__dirname, '/src/templates/order.jade')
    }),
    new HtmlWebpackPlugin({
      filename:'boxes.html',
      chunks: ['boxes','commons'],
      template: path.join(__dirname, '/src/templates/boxes.jade')
    }),
    new HtmlWebpackPlugin({
      filename: 'faq.html',
      template: path.join(__dirname, '/src/templates/faq.jade')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index','commons'],
      template: path.join(__dirname, '/src/templates/index.jade')
    }),
    new HtmlWebpackPlugin({
      filename:'contact.html',
      chunks: ['contact', 'commons'],
      template: path.join(__dirname, '/src/templates/contact.jade')
    }),
    lessPlugin,
    new CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons-[hash].js'
      }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
    {
      test: /\.jade$/,
      loader: 'html?attrs=img:src!jade-html'
    },
    {
      test: /\.less$/,
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
      loader: 'react-hot!babel',
      include: path.join(__dirname, '/src/js')
    },
    {
      test: /\.css$/,
      loader: 'style!css'
    }
    ]
  }
};
