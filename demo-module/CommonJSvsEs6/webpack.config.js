const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry : {
        index: './src/module1.js',
        // app: './src/app.js'
    },
    //which maps your compiled code back to your original source code
    devtool: 'inline-source-map',

    mode: "development",

    //webpack-dev-server provides you with a simple web server and the ability to use live reloading
    devServer: {
        contentBase: path.resolve(__dirname,"dist"),
        compress: true,
        port: 9000,
        //HMR  It allows all kinds of modules to be updated at runtime without the need for a full refresh.
        hot: true     //open Hot Module Replacement
    },
    output : {
        path : path.resolve(__dirname,"dist"),
        filename : "[name].bundle.js",
        //The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000. 
        publicPath: '/'   
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"  // creates style nodes from JS strings
                }, {
                    loader: "css-loader"    // translates CSS into CommonJS
                }, {
                    loader: "sass-loader"   // compiles Sass to CSS
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        // This is especially useful for webpack bundles that include a hash in the filename
        // which changes every compilation
        new HtmlWebpackPlugin({
            title: 'My App',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ]
};