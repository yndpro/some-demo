///<reference path="../typings/index.d.ts"/>
import util from "./util";
import config from '../config'
import * as copy from 'copy-webpack-plugin'
import * as BannerPlugin from 'banner-webpack-plugin'
import { Configuration } from "webpack";

const { root, getEntryByGlob, getEntryBanner } = util;
const entries = getEntryByGlob(config.entry, true)
const banners = getEntryBanner(entries)
const output = root(config.outputDir)

export default {
  mode: 'production',
  entry: entries,
  output: {
    filename: "[name].js",
    path: output,
    libraryTarget: 'umd',
  },
  plugins: [
    new copy([{
      from: root('README.md'),
      to: root('release/README.md')
    }]),
    new copy([{
      from: root('package.json'),
      to: root('release/package.json')
    }]),
    new BannerPlugin({
      chunks: banners
    }),
  ],
  externals: {

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
        include: root('src'),
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
