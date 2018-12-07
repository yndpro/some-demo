
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxy = require('http-proxy-middleware');

const app = express();
const config = require('./webpack.dev');
const compiler = webpack(config);

// const apiProxy = proxy({
//   target: 'https://api.douban.com',
//   changeOrigin: true
// });
// app.use([`/v2/movie/*`], apiProxy);
const apiProxy = proxy({
  target: 'http://apps.4399.com',
  changeOrigin: true
});
app.use([`/hd/yp/*`], apiProxy);


app.use('/static',express.static(path.join(__dirname, 'static')));
app.use('/lib',express.static(path.join(__dirname, '../lib')));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// Serve the files on port 3030.
app.listen(3030, function () {
  console.log('Example app listening on port 3030!\n');
});