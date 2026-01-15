const Path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: Path.resolve(__dirname, 'media/build'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:9091/media/build/',
    },
    devServer: {
        host: '0.0.0.0',
        hot: true,
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
            webSocketURL: {
                hostname: 'localhost',
                pathname: '/ws',
                port: 9091,
                protocol: 'ws',
            },
            overlay: {
                warnings: false,
                errors: true
            }
        }
    },
    plugins: [new ReactRefreshWebpackPlugin()],
});