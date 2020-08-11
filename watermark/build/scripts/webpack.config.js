"use strict";
exports.__esModule = true;
///<reference path="../typings/index.d.ts"/>
var util_1 = require("./util");
var config_1 = require("../config");
var copy = require("copy-webpack-plugin");
var BannerPlugin = require("banner-webpack-plugin");
var root = util_1["default"].root, getEntryByGlob = util_1["default"].getEntryByGlob, getEntryBanner = util_1["default"].getEntryBanner;
var entries = getEntryByGlob(config_1["default"].entry, true);
var banners = getEntryBanner(entries);
var output = root(config_1["default"].outputDir);
exports["default"] = {
    mode: 'production',
    entry: entries,
    output: {
        filename: "[name].js",
        path: output,
        libraryTarget: 'umd'
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
    externals: {},
    resolve: {
        extensions: [".js", ".json", ".ts"],
        alias: {
            "@": root("src")
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
    }
};
