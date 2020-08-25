"use strict";
// interface Params<T>{
//     dataSource : T,
//     dataSourceType : string,
//     textAlign : string,
//     textBaseline : string,
//     font : string,
//     fillStyle : string,
//     content : string,
//     textX : number,
//     textY : number
// }
exports.__esModule = true;
exports.createWaterMark = void 0;
var WaterMark = /** @class */ (function () {
    function WaterMark(params) {
        var _this = this;
        this.textAlign = 'center';
        this.font = "14px Microsoft Yahei";
        this.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.content = "仅供4399UED使用";
        this.textX = 100;
        this.textY = 30;
        this.success = function () { };
        this.error = function () { };
        this.dataSource = params.dataSource;
        this.dataSourceType = params.dataSourceType;
        this.textAlign = params.textAlign;
        this.textBaseline = params.textBaseline;
        this.font = params.font;
        this.fillStyle = params.fillStyle;
        this.content = params.content;
        this.textX = params.textX;
        this.textY = params.textY;
        this.success = params.success;
        this.error = params.error;
        this._getImgFromDataSource(this.dataSource, this.dataSourceType, function (img) {
            var base64 = _this._drawToCanvas(img);
            _this.success(base64);
        });
    }
    WaterMark.prototype._getBase64FromImgFile = function (file, callBack) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var base64Img = e.target.result;
            if (callBack) {
                callBack(base64Img);
            }
        };
        reader.readAsDataURL(file);
    };
    WaterMark.prototype._getImgFromDataSource = function (dataSource, dataSourceType, callback) {
        var img = new Image();
        if (dataSourceType == "image") {
            img.src = dataSource.src;
        }
        else if (dataSourceType == "base64" || dataSourceType == "url") {
            img.src = dataSource;
        }
        else if (dataSourceType == "canvas") {
            img.src = dataSource.toDataURL("image/jpeg");
        }
        else if (dataSourceType == "file") {
            this._getBase64FromImgFile(dataSource, function (base64str) {
                img.src = base64str;
            });
        }
        img.onload = function () {
            if (callback) {
                callback(img);
            }
        };
    };
    WaterMark.prototype._drawToCanvas = function (img) {
        img.crossOrigin = 'anonymous';
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.font = this.font;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(-30 * Math.PI / 180);
        ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 4;
        ctx.strokeText(this.content, this.textX, this.textY);
        ctx.fillStyle = this.fillStyle;
        ctx.fillText(this.content, this.textX, this.textY);
        return canvas.toDataURL();
    };
    return WaterMark;
}());
var createWaterMark = function (params) {
    return new WaterMark(params);
};
exports.createWaterMark = createWaterMark;
exports["default"] = WaterMark;