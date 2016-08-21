var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var lessPlugin = new ExtractTextPlugin("style-[hash].css", {
    allChunks: true
});


module.exports = [
    {
        contentBase: path.join(__dirname, 'src'),
        entry: {
            index: './src/js/apps/index',
            order: './src/js/apps/order',
            products: './src/js/apps/products',
            stuff: './src/js/apps/stuff',
            contact: './src/js/apps/contact',
            orders: './src/js/apps/orders'
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name]-[chunkhash].js',
            publicPath: './'
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production")
                }
            }),
            new HtmlWebpackPlugin({
                filename: 'order.html',
                chunks: ['order', 'commons'],
                template: path.join(__dirname, '/src/templates/order.jade')
            }),
            new HtmlWebpackPlugin({
                filename: 'orders.html',
                chunks: ['orders', 'commons'],
                template: path.join(__dirname, '/src/templates/orders.jade')
            }),
            new HtmlWebpackPlugin({
                filename: 'products.html',
                chunks: ['products', 'commons'],
                template: path.join(__dirname, '/src/templates/products.jade')
            }),
            new HtmlWebpackPlugin({
                filename: '404.html',
                template: path.join(__dirname, '/src/templates/404.jade')
            }),
            new HtmlWebpackPlugin({
                filename: 'faq.html',
                template: path.join(__dirname, '/src/templates/faq.jade')
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'commons'],
                template: path.join(__dirname, '/src/templates/index.jade')
            }),
            new HtmlWebpackPlugin({
                filename: 'contact.html',
                chunks: ['contact', 'commons'],
                template: path.join(__dirname, '/src/templates/contact.jade')
            }),
            new HtmlWebpackPlugin({
                filename: 'stuff.html',
                chunks: ['stuff', 'commons'],
                template: path.join(__dirname, '/src/templates/stuff.jade')
            }),
            new CleanWebpackPlugin(['dist'], {
                verbose: true
            }),
            lessPlugin,
            new CommonsChunkPlugin({
                name: 'commons',
                filename: 'commons-[hash].js'
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            //new webpack.optimize.UglifyJsPlugin(),
            new webpack.optimize.DedupePlugin(),
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
                    loader: 'file'
                },
                {
                    test: /\.(woff|woff2|ttf|eot)$/,
                    loader: 'file'
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
