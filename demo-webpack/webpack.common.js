const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


console.log("__dirname:",__dirname);
module.exports = {
    entry : {
        // index: './src/index.js',
        index: path.resolve(__dirname,"src/index.js")
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                      {
                          loader: 'css-loader',
                          options: {
                              // If you are having trouble with urls not resolving add this setting.
                              // See https://github.com/webpack-contrib/css-loader#url
                            //   url: false,
                              minimize: true,
                              sourceMap: true,
                              publicPath: '../',     //TODO:replace the url of images in css     relative url
                          }
                      }, 
                      {
                          loader: 'sass-loader',
                          options: {
                              sourceMap: true
                          }
                      }
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader : 'url-loader',
                    options: {
                        limit: 500,
                        name: 'images/[name]_[hash:7].[ext]'                //url relative to output publicPath
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        // This is especially useful for webpack bundles that include a hash in the filename
        // which changes every compilation
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,"index.tpl.html"),
            inject:'body',
            filename: './index.html',
            // '../../../template/ztdj/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: "css/style.css",
            disable: false,
            allChunks: true
        })
    ]
};