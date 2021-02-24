const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].bundle.js',
        //The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000.
        publicPath: './' //TODO: packed url can replace by CDN
    },
    module: {
        rules: [
            // {
            //   test: /\.css$/,
            //   use: [
            //     {
            //       loader: MiniCssExtractPlugin.loader
            //     },
            //     'css-loader'
            //   ]
            // },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    {
                        loader: ExtractCssChunks.loader,
                        options: {
                            publicPath: process.env.BUID_ENV === 'test' ? '../' : '/resource/openapiv2/index/'
                        }
                    },
                    { loader: 'css-loader' },
                    // { loader: 'postcss-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    plugins: [
        // new MiniCssExtractPlugin({
        //   filename: '[name].css',
        //   chunkFilename: '[id].css'
        // }),
        new ExtractCssChunks({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new CleanWebpackPlugin()
        // Visualize size of webpack output files with an interactive zoomable treemap.
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        // Originally, chunks (and modules imported inside them) were connected by a parent-child relationship in the internal webpack graph.
        // The CommonsChunkPlugin was used to avoid duplicated dependencies across them, but further optimizations were not possible.
        splitChunks: {
            cacheGroups: {
                lodash: {
                    test: /[\\/]node_modules[\\/](lodash)/,
                    name: 'lodash',
                    chunks: 'all'
                },
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)/,
                    name: 'react',
                    chunks: 'all'
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
});
