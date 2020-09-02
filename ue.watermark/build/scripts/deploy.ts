///<reference path="../typings/index.d.ts"/>

'use strict'
import * as webpack from 'webpack'
import deployConfig from './webpack.config.deploy'
import { spinner } from './util';

function task() {
  spinner.start();
  webpack(deployConfig, function (err, stats) {
    if (err) throw err
    process.stdout.write('\n\n' + stats.toString({
      colors: true,
      modules: false,
      version: false,
      children: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false,
      hash: false,
      timings: false,
    }) + '\n\n')
    if (stats.hasErrors()) {
      console.log('  发布失败.\n')
      process.exit(1)
    }
    console.log('  发布到static完成.\n')
    spinner.stop();
  })
}
task();
