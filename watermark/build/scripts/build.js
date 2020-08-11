///<reference path="../typings/index.d.ts"/>
'use strict';
exports.__esModule = true;
var webpack = require("webpack");
var webpack_config_1 = require("./webpack.config");
var util_1 = require("./util");
function task() {
    util_1.spinner.start();
    webpack(webpack_config_1["default"], function (err, stats) {
        if (err)
            throw err;
        process.stdout.write('\n\n' + stats.toString({
            colors: true,
            modules: false,
            version: false,
            children: false,
            chunks: false,
            chunkModules: false,
            entrypoints: false,
            hash: false,
            timings: false
        }) + '\n\n');
        if (stats.hasErrors()) {
            console.log('  构建失败.\n');
            process.exit(1);
        }
        console.log('  构建完成.\n');
        util_1.spinner.stop();
    });
}
task();
