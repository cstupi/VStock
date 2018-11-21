'use strict'

const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

function resolve(dir){
    return path.join(__dirname, '..',dir)
}

module.exports = {
    mode: 'development',
    devServer: {
        hot: true,
        historyApiFallback: true,
        watchOptions: {
            poll: true
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader'
                ]
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(js|vue)$/,
                use: 'eslint-loader',
                enforce: 'pre'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: resolve('static/img'),
            to: resolve('dist/static/img'),
            toType: 'dir'
        }]),
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
          })
    ]
}