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

class WaterMark {
  dataSource: any;
  dataSourceType: string;
  textAlign: any = 'center';
  textBaseline: 'middle';
  font: string = "14px Microsoft Yahei";
  fillStyle: string = 'rgba(0, 0, 0, 0.5)';
  content: string = "仅供4399UED使用";
  textX: number = 100;
  textY: number = 30;
  success: any = () => {};
  error: any = () => {};

  constructor(params) {
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
      
      this._getImgFromDataSource(this.dataSource, this.dataSourceType, img => {
        console.log("1",img);
          const base64 = this._drawToCanvas(img);
          this.success(base64);
      })
  }

  private _getBase64FromImgFile(file, callBack) {
      const reader = new FileReader();
      reader.onload = function (e) {
          const base64Img = e.target.result;
          if (callBack) {
              callBack(base64Img);
          }
      };
      reader.readAsDataURL(file);
  }

  private _getImgFromDataSource(dataSource, dataSourceType, callback) {
      let img = new Image();
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
          this._getBase64FromImgFile(dataSource, base64str => {
              img.src = base64str;
          });
      }
      img.onload = function () {
          if (callback) {
              callback(img);
          }
      }
  }

  private _drawToCanvas(img) {
    console.log("3");
    
      img.crossOrigin = 'anonymous';

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
      ctx.textAlign = this.textAlign;
      ctx.textBaseline = this.textBaseline;
      ctx.font = this.font;

      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(-30 * Math.PI / 180);
      ctx.translate(-(canvas.width / 2), -(canvas.height / 2))

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 4;
      ctx.strokeText(this.content, this.textX, this.textY);
      ctx.fillStyle = this.fillStyle;
      ctx.fillText(this.content, this.textX, this.textY);
      console.log("5",canvas.toDataURL());
      return canvas.toDataURL();
  }
}

const createWaterMark = params => {
  return new WaterMark(params);
}

export { createWaterMark };
export default WaterMark;
