const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry : {
        app: './src/index.js',
        app2: './src/index2.js'
    },
    //which maps your compiled code back to your original source code
    devtool: 'inline-source-map',

    //webpack-dev-server provides you with a simple web server and the ability to use live reloading
    devServer: {
        contentBase: path.resolve(__dirname,"dist"),
        compress: true,
        port: 9000
    },
    output : {
        path : path.resolve(__dirname,"dist"),
        filename : "[name].bundle.js"
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
    ]
};