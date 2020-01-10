//const HtmlWebpackPlugin = require('html-webpack-plugin');
//import HtmlWebpackPlugin from 'html-webpack-plugin';

//import webpack from 'webpack';
const webpack = require('webpack');
//import path from 'path';
const path = require('path');
//import CopyWebpackPlugin from 'copy-webpack-plugin';
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    /*entry: path.join(__dirname, 'src', 'index.js'),
    output: { path: path.join(__dirname, 'build'), filename: 'index.bundle.js' },
    mode: process.env.NODE_ENV || 'development',
    resolve: { modules: [path.resolve(__dirname, 'src'), 'node_modules']},
    devServer: { contentBase: path.join(__dirname, 'src')},*/

    mode: process.env.NODE_ENV || 'development',

    context: path.join(__dirname, '../app'),
    devtool: 'inline-source-map',
    entry:{
        app: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:9000',
            'webpack/hot/only-dev-server',
            './src/main/components/App.js'
        ]
    },
    //entry: "./src/main/components/index.js",
    output:{
        path: path.resolve(__dirname, './app/build'),
        filename: 'app.bundle.js',
        publicPath: 'http://localhost:9000/'
    },
    devServer: {
        hot: true,
        publicPath: 'http://localhost:9000/',
        historyApiFallback: true,
        port: 9000,
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
                    options: { name: '/static/[name].[ext]' }
                }],                
            },
        ],
    },
    plugins: [ 
        //new HtmlWebpackPlugin({ template: path.join(__dirname, 'src', 'index.html')})
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.IgnorePlugin(/ajv/),
        //new webpack.IgnorePlugin(/fs|tls|net|child_process|term.js|pty.js|readline|dgram|dns|repl|\.\.\/API\/schema/),
        new CopyWebpackPlugin([{
            from: './src/main/app.js',
        }, 
        {
            from: './src/main/index.html'
        },
    ]),
    ],
    //target: 'electron-main',
    //target: 'web',
    node : {
        __dirname: false
    }
};