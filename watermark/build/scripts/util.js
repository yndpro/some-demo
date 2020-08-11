"use strict";
///<reference path="../typings/index.d.ts"/>
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.spinner = void 0;
var path_1 = require("path");
var glob = require("glob");
var ora = require("ora");
var packageInfo = require('../../package.json');
var name = packageInfo.name, author = packageInfo.author, version = packageInfo.version;
var content = "/*! \n* " + name + "@" + version + "\n* author:" + author + " \n* releaseTime: " + new Date().toISOString() + "\n*/\n";
exports.spinner = ora({
    text: '正在构建',
    spinner: {
        interval: 40,
        frames: ['⠋ ⠴', '⠙ ⠦', '⠹ ⠧', '⠼ ⠹', '⠴ ⠋', '⠦ ⠙', '⠧ ⠼']
    }
});
var utils = {
    isDev: process.env.NODE_ENV == 'development',
    root: function (dir) {
        var dirs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            dirs[_i - 1] = arguments[_i];
        }
        return path_1.resolve.apply(void 0, __spreadArrays([__dirname, '../../', dir], dirs));
    },
    /**
     * 根据glob 生成入口对象
     * @param globPath glob表达式，可以是确切路径
     * @param bool  默认为true 是否以匹配的文件名作为入口名，false的话会取其所在文件夹的命名
     */
    getEntryByGlob: function (globPath, bool) {
        if (bool === void 0) { bool = true; }
        var path = utils.root(path_1.normalize(globPath));
        var entries = {};
        var isGlob = glob.hasMagic(globPath);
        glob.sync(path).forEach(function (entry) {
            var dirs = path_1.dirname(entry).split('/');
            var leastdir = dirs[dirs.length - 1];
            var fileName = path_1.basename(entry);
            var ext = path_1.extname(entry);
            var name = fileName.replace(ext, '');
            if (!isGlob || bool) {
                entries[name] = entry;
            }
            else {
                entries[leastdir] = entry;
            }
        });
        return entries;
    },
    getEntryBanner: function (entries) {
        var entriesCopy = __assign({}, entries);
        for (var i in entriesCopy) {
            delete entriesCopy[i];
            entriesCopy[i] = {
                beforeContent: '/* eslint-disable */\n' + content
            };
        }
        return entriesCopy;
    }
};
exports["default"] = utils;
