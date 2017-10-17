const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
var path = require('path');

let isProd = process && process.env.NODE_ENV === 'production'

module.exports = {
    entry: ["babel-polyfill", "./app/app.js"],
    output: {
        path: path.resolve(__dirname, "public/js"),
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader?' + (isProd ? 'minimize' : '') + '!postcss-loader!sass-loader')
            },
            {
                test: /.(svg|woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
                loader: "file-loader?name=[name].[ext]&publicPath=../fonts/&emitFile=false"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            autosize: 'autosize'
        }),
        new ExtractTextPlugin({
            filename: '../css/styles.css'
        })
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
}
