const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

// console.log('__dirname：', __dirname);
// console.log('__filename：', __filename);
// console.log('process.cwd()：', process.cwd());
// console.log('./：', path.resolve('./'));

const resolveApp = (next) => path.resolve(__dirname, '../app', next);
const resolvePublic = (next) => path.resolve(__dirname, '../public', next);

module.exports = {
    entry: {
        index: path.resolve(__dirname, '../app/index.js')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            // If you are having trouble with urls not resolving add this setting.
                            // See https://github.com/webpack-contrib/css-loader#url
                            //   url: false,
                            minimize: true,
                            sourceMap: true,
                            publicPath: '../' //TODO:replace the url of images in css     relative url
                        }
                    },
                    // { loader: 'postcss-loader' },
                    {
                        loader: 'sass-loader',
                        options: {
                            prependData: 'variables.scss',
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            esModule: false,
                            //name: "img/[name]_[hash:7].[ext]" //url relative to output publicPath
                            name: 'img/[name].[ext]' //url relative to output publicPath
                        }
                    }
                ]
            }
        ]
    },
    // Configure how modules are resolved.
    resolve: {
        // Create aliases to import or require certain modules more easily
        alias: {
            '@app': resolveApp(''),
            '@pages': resolveApp('./pages'),
            '@components': resolveApp('./components'),
            '@redux': resolveApp('./redux'),
            '@public': resolvePublic('./public')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BUID_ENV': JSON.stringify(process.env.BUID_ENV)
        }),
        // This is especially useful for webpack bundles that include a hash in the filename
        // which changes every compilation
        new HtmlWebpackPlugin({
            template: resolveApp('./index.tpl.html'),
            inject: 'body',
            filename: './index.html'
        }),
        new SpritesmithPlugin({
            // 目标小图标
            src: {
                cwd: resolveApp('./assets/images/icons'),
                glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: resolveApp('./assets/images/sprite.png'),
                css: [
                    [
                        resolveApp('./assets/sass/sprite.scss'),
                        {
                            format: 'function_based_template'
                        }
                    ]
                ]
            },
            customTemplates: {
                function_based_template: path.resolve(__dirname, '../my_handlebars_template.handlebars')
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: '../assets/images/sprite.png?v=' + Date.parse(new Date())
            },
            spritesmithOptions: {
                algorithm: 'binary-tree',
                padding: 8
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        // Automatically load modules instead of having to import or require them everywhere.
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ]
};
