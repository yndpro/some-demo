const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let instanceSpritesmithPlugin = ['btn','other','ibg','pro','lottery'].map(function(prefix){
    return new SpritesmithPlugin({
        src: {
            cwd: path.resolve(__dirname, `src/assets/images/${prefix}_sprite`),
            glob: '*.png'
        },
        target: {
            image: path.resolve(__dirname, `src/assets/images/${prefix}_sprite.png`),
            css: [
                [path.resolve(__dirname, `src/assets/sass/${prefix}_sprite.scss`), {
                    format: 'handlebars_based_template',
                    formatOpts : prefix
                }]
            ]
        },
        apiOptions: {
            cssImageRef : `../assets/images/${prefix}_sprite.png`
        },
        spritesmithOptions : {
            padding : 4
        },
        customTemplates: {
            'handlebars_based_template': path.resolve(__dirname, 'src/assets/scss.handlebars')
        },
    })
})

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
        ...instanceSpritesmithPlugin,
        new ExtractTextPlugin({
            filename: "css/style.css",
            disable: false,
            allChunks: true
        })
    ]
};