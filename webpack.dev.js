const Path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: Path.resolve(__dirname, 'media/build'),
        filename: 'bundle.js'
    },
    devServer: {
        hot: true,
        port: 9091,
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true,
            publicPath: 'http://localhost:9091/',
        },
        static: {
            directory: './'
        }
    }
});