///<reference path="../typings/index.d.ts"/>
import util from "./util";
import config from '../config'
import * as copy from 'copy-webpack-plugin'
import * as BannerPlugin from 'banner-webpack-plugin'
import { Configuration } from "webpack";
import * as path from 'path'

const { root, getEntryByGlob, getEntryBanner } = util;
const entries = getEntryByGlob(config.entry, true)
const banners = getEntryBanner(entries)
const output = root(config.deployDir)

const packageInfo = require('../../package.json') ;
const version = packageInfo.version;

export default {
  mode: 'production',
  entry: entries,
  output: {
    filename: "[name].umd.js",
    path: path.join(output,`v${version}`),
    libraryTarget: 'umd',
  },
  plugins: [
    new BannerPlugin({
      chunks: banners
    })
  ],
  externals: {
    'jquery':'jQuery'
  },
  resolve: {
    extensions: [".js", ".json", ".ts"],
    alias: {
      "@": root("src"),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // include: root('src'),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                ["@babel/plugin-proposal-class-properties"],
              ]
            }
          },
          {
            loader: "eslint-loader",
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        include: root("src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          },
          {
            loader: "eslint-loader",
            options: {
              fix: true
            }
          }
        ]
      }
    ]
  },
} as Configuration;
