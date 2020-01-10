//import webpack from 'webpack';
const webpack = require('webpack');
//import path from 'path';
const path = require('path');
//import CopyWebpackPlugin from 'copy-webpack-plugin';
const CopyWebpackPlugin = require('copy-webpack-plugin');
//import MinifyPlugin from 'babel-minify-webpack-plugin';
const MinifyPlugin = require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//import ExtractTextPlugin from 'extract-text-webpack-plugin';
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
//import HtmlWebpackPlugin from 'html-webpack-plugin';
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    /*entry: path.join(__dirname, 'src', 'index.js'),
    output: { path: path.join(__dirname, 'build'), filename: 'index.bundle.js' },
    mode: process.env.NODE_ENV || 'development',
    resolve: { modules: [path.resolve(__dirname, 'src'), 'node_modules']},
    devServer: { contentBase: path.join(__dirname, 'src')},*/

    context: path.join(__dirname, '../app'),
    devtool: 'source-map',
    entry:{
        app: [            
            './src/main/components/App.js'
        ]
    },
    output:{
        path: path.resolve(__dirname, '../app/build'),
        filename: 'app.bundle.js',        
    },    
    module: {
        rules: [
            {
                // this is so that we can compile any React
                // Es6 and above into normal ES5 syntax
                test: /\.(js|jsx)$/,
                // we do not want anything from node_modules to be compiled
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    // creates style nodes from js strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test:/\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/'
                    }
                }],                
            },
        ],
    },
    plugins: [ 
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        //new HtmlWebpackPlugin({ template: path.join(__dirname, 'src', 'index.html')})
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new MinifyPlugin(),
        new MiniCssExtractPlugin('css/main.css'),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.IgnorePlugin(/ajv/),
        new CopyWebpackPlugin([{
            from: './src/main/app.js',
            to: path.join(__dirname, '../app/build'),
        }, 
        {
            from: './src/main/index.html',
            to: path.join(__dirname, '../app/build')
        },
    ]),
    ],
    //target: 'electron-main',
    //target: 'web',
    node : {
        __dirname: false
    }
};