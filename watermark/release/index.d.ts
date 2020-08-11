declare class WaterMark {
    dataSource: any;
    dataSourceType: string;
    textAlign: any;
    textBaseline: 'middle';
    font: string;
    fillStyle: string;
    content: string;
    textX: number;
    textY: number;
    success: any;
    error: any;
    constructor(params: any);
    private _getBase64FromImgFile;
    private _getImgFromDataSource;
    private _drawToCanvas;
}
declare const createWaterMark: (params: any) => WaterMark;
export { createWaterMark };
export default WaterMark;
