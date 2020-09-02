///<reference path="../typings/index.d.ts"/>

import { resolve, normalize, basename, dirname, extname, posix } from 'path';
import glob = require('glob');
import ora = require('ora');

const packageInfo = require('../../package.json')
const { name, author, version } = packageInfo

const content = `/*! 
* ${name}@${version}
* author:${author} 
* releaseTime: ${new Date().toISOString()}
*/\n`

export const spinner = ora({
  text: '正在构建',
  spinner: {
    interval: 40,
    frames: ['⠋ ⠴', '⠙ ⠦', '⠹ ⠧', '⠼ ⠹', '⠴ ⠋', '⠦ ⠙', '⠧ ⠼']
  }
})

let utils = {
  isDev: process.env.NODE_ENV == 'development',
  root(dir: string, ...dirs) {
    return resolve(__dirname, '../../', dir, ...dirs)
  },
  /**
   * 根据glob 生成入口对象
   * @param globPath glob表达式，可以是确切路径
   * @param bool  默认为true 是否以匹配的文件名作为入口名，false的话会取其所在文件夹的命名
   */
  getEntryByGlob(globPath: string, bool = true) {
    let path = utils.root(normalize(globPath))
    let entries = {};
    let isGlob = glob.hasMagic(globPath);
    glob.sync(path).forEach(entry => {
      let dirs = dirname(entry).split('/');
      let leastdir = dirs[dirs.length - 1];
      let fileName = basename(entry);
      let ext = extname(entry)
      let name = fileName.replace(ext, '');
      if (!isGlob || bool) {
        entries[name] = entry;
      } else {
        entries[leastdir] = entry;
      }
    });
    return entries;
  },

  getEntryBanner(entries) {
    let entriesCopy = { ...entries }
    for (let i in entriesCopy) {
      delete entriesCopy[i];
      entriesCopy[i] = {
        beforeContent: '/* eslint-disable */\n' + content
      }
    }
    return entriesCopy
  }

}

export default utils;
