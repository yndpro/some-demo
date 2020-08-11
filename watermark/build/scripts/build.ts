///<reference path="../typings/index.d.ts"/>

'use strict'
import * as webpack from 'webpack'
import prodConfig from './webpack.config'
import { spinner } from './util';
function task() {
  spinner.start();
  webpack(prodConfig, function (err, stats) {
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
      console.log('  构建失败.\n')
      process.exit(1)
    }
    console.log('  构建完成.\n')
    spinner.stop();
  })
}
task();
