const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "production",

    output : {
        path : path.resolve(__dirname,"dist"),
        filename : "[name].bundle.js",
        //The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000. 
        publicPath: '../'     //TODO: packed url can replace by CDN
    },

    plugins: [
        
    ]
})