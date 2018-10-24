const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let instanceSpritesmithPlugin = ['btn','other'].map(function(prefix){
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
        customTemplates: {
            'handlebars_based_template': path.resolve(__dirname, 'src/assets/scss.handlebars')
        },
    })
})

module.exports = {
    entry : {
        // index: './src/index.js',
        index: './src/index.js'
    },
    //which maps your compiled code back to your original source code
    devtool: 'inline-source-map',

    mode: "production",

    //webpack-dev-server provides you with a simple web server and the ability to use live reloading
    devServer: {
        contentBase: path.resolve(__dirname,"dist"),
        compress: true,
        port: 9000,
        proxy: [
            {
                 context: '/cn/xxtjd/*',
                 target: 'http://web147.hd.4399.com',
                 secure: false
           }
        ],
        //HMR  It allows all kinds of modules to be updated at runtime without the need for a full refresh.
        hot: true     //open Hot Module Replacement
    },
    output : {
        path : path.resolve(__dirname,"dist"),
        filename : "[name].bundle.js",
        //The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000. 
        publicPath: '/dist/'     //TODO: packed url can replace by CDN
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
            template: './index.tpl.html',
            inject:'body',
            filename: './index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),
        ...instanceSpritesmithPlugin,
        new ExtractTextPlugin("style.css")
    ]
};