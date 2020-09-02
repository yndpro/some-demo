/* eslint-disable */
class WaterMark {
    /** 底图数据源 */
    dataSource: string;
    /** 底图数据源类型 */
    dataSourceType: "image" | "base64" | "canvas" | "file";
    /** 水印字体 */
    font?: string;
    /** 水印旋转角度 */
    angle?: number;
    /** 水印字体样式 */
    fillStyle?: string;
    /** 水印描边样式 */
    strokeStyle?: string;
    /** 水印字体内容 */
    content?: string;
    /** 水印横向间隔 */
    intervalX?: number;
    /** 水印纵向间隔 */
    intervalY?: number;
    /** 水印绘制成功回调 */
    success?: (rst: string) => void;
    constructor({
        dataSource,
        dataSourceType,
        font = "26px Microsoft Yahei",
        angle = -30,
        fillStyle = "rgba(0, 0, 0, 0.5)",
        strokeStyle = "rgba(255, 255, 255, 0.5)",
        content = "仅供4399UED使用",
        intervalX = 80,
        intervalY = 150,
        success
    }) {
        this.dataSource = dataSource;
        this.dataSourceType = dataSourceType;
        this.font = font;
        this.angle = angle;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.content = content;
        this.intervalX = intervalX;
        this.intervalY = intervalY;
        this.success = success;

        this.getImgFromDataSource(this.dataSource, this.dataSourceType, img => {
            this.drawToCanvas(img);
        })
    }

    /**
     * File类型转成base64
     * @param file 
     * @param callBack 
     */
    private getBase64FromImgFile(file, callBack) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64Img = e.target.result;
            if (callBack) {
                callBack(base64Img);
            }
        };
        reader.readAsDataURL(file);
    }

    /**
     * 将来源数据统一转化成Image对象
     * @param dataSource 
     * @param dataSourceType 
     * @param callback 
     */
    private getImgFromDataSource(dataSource, dataSourceType, callback) {

        let img = new Image();
        if (dataSourceType == "image") {
            img.src = dataSource.src;
        }
        else if (dataSourceType == "base64") {
            img.src = dataSource;
        }
        else if (dataSourceType == "canvas") {
            img.src = dataSource.toDataURL("image/jpeg");
        }
        else if (dataSourceType == "file") {
            this.getBase64FromImgFile(dataSource, base64str => {
                img.src = base64str;
            });
        }
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            if (callback) {
                callback(img);
            }
        }
    }

    /**
     * 绘制
     * @param img 
     */
    private drawToCanvas(img) {

        //创建画布
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        //获取画布句柄
        const ctx = canvas.getContext('2d');

        //绘制背景图片
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);

        //画布整体旋转
        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.translate(-(canvas.width / 2), -(canvas.height / 2))

        //设置字体样式
        ctx.textAlign = 'start';
        ctx.textBaseline = 'top';
        ctx.font = this.font;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = 4;

        //获取最长边
        const longerSide = img.width > img.height ? img.width : img.height;

        //画布整体横向偏移量
        const offsetX = longerSide * -1;

        //画布整体纵向向偏移量
        const offsetY = longerSide * -1;

        //文字宽度
        const textWidth = ctx.measureText(this.content).width;

        //文字偏移量
        const offset = 100;

        //TODO:边界问题
        for (let j = 0, y = 0, _offset = 0; y < longerSide * 3; j += 1) {
            y = j * this.intervalY;
            _offset = offset * j;
            for (let i = 0, x = _offset; x < longerSide * 3; i += 1) {
                x = i * (textWidth + this.intervalX) + _offset;
                ctx.strokeText(this.content, x + offsetX, y + offsetY);
                ctx.fillStyle = this.fillStyle;
                ctx.fillText(this.content, x + offsetX, y + offsetY);
            }
        }

        //导出绘制后的图片
        const base64Url = canvas.toDataURL();
        this.success(base64Url);


    }
}

const createWaterMark = options => {
    return new WaterMark(options);
}

export { createWaterMark };
export default WaterMark;
