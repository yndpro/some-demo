const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const apiMocker = require('mocker-api');

module.exports = merge(common, {
    mode: 'development',

    //which maps your compiled code back to your original source code
    devtool: 'inline-source-map',

    //webpack-dev-server provides you with a simple web server and the ability to use live reloading
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true,
        host: 'localhost',
        port: 9007,
        proxy: {
            '/openapiv2': {
                // 路径中有 /api 的请求都会走这个代理 , 可以自己定义一个,下面移除即可
                target: 'http://m.4399api.com', // 目标代理接口地址,实际跨域要访问的接口,这个地址会替换掉 axios.defaults.baseURL
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
                ws: true, // 是否启用  websockets;
                pathRewrite: {
                    // 去掉 路径中的  /api  的这一截
                    //"^/openapiv2": ""
                }
            }
        },
        //HMR  It allows all kinds of modules to be updated at runtime without the need for a full refresh.
        hot: true, //open Hot Module Replacement

        before(app) {
            apiMocker(app, path.resolve(__dirname, '../public/mock.js'));
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        //The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000.
        publicPath: '/dist/' //TODO: packed url can replace by CDN
    }
});
