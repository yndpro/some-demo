"use strict";
///<reference path="./typings/index.d.ts"/>
exports.__esModule = true;
exports["default"] = new /** @class */ (function () {
    function buildConfig() {
        this.showAnalyze = false;
        this.entry = 'src/*.{js,ts}';
        this.outputDir = 'release/';
    }
    return buildConfig;
}());
