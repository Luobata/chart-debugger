const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.conf.js');
const assetsSubDirectory = 'static/';

const getEntry = () => {
    const base = path.resolve(__dirname, '../src/entry');
    const baseDir = fs.readdirSync(base);
    const result = {};
    for (let i of baseDir) {
        const name = path.parse(i).name;
        result[name] = `${base}/${name}`;
    }
    return result;
};

module.exports = {
    entry: getEntry(),
    output: {
        path: path.join(__dirname, '../dev-tools/build'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            SRC: path.resolve(__dirname, '../src'),
            COMPONENTS: path.resolve(__dirname, '../src/components'),
            LIB: path.resolve(__dirname, '../src/lib'),
        },
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig,
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsSubDirectory + 'img/[name].[hash:7].[ext]',
                },
            },
        ],
    },
};
