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
        host: '0.0.0.0',
        hot: false,
        port: 9091,
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true,
            publicPath: '/media/build/',
        },
        static: {
            directory: './'
        },
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        client: {
            webSocketURL: 'auto://0.0.0.0:0/ws',
            overlay: {
                warnings: false,
                errors: true
            }
        }
    },
});