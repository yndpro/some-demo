const webpack = require('webpack');
const config = require('./webpack.prod');

webpack(config, (err, stats) => {
    console.log('err', err);
    if (err || stats.hasErrors()) {
        console.error(err);
        return;
    }

    console.log(
        stats.toString({
            chunks: false,
            colors: true
        })
    );
});
