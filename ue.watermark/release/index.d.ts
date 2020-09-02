declare class WaterMark {
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
    constructor({ dataSource, dataSourceType, font, angle, fillStyle, strokeStyle, content, intervalX, intervalY, success }: {
        dataSource: any;
        dataSourceType: any;
        font?: string;
        angle?: number;
        fillStyle?: string;
        strokeStyle?: string;
        content?: string;
        intervalX?: number;
        intervalY?: number;
        success: any;
    });
    /**
     * File类型转成base64
     * @param file
     * @param callBack
     */
    private getBase64FromImgFile;
    /**
     * 将来源数据统一转化成Image对象
     * @param dataSource
     * @param dataSourceType
     * @param callback
     */
    private getImgFromDataSource;
    /**
     * 绘制
     * @param img
     */
    private drawToCanvas;
}
declare const createWaterMark: (options: any) => WaterMark;
export { createWaterMark };
export default WaterMark;
