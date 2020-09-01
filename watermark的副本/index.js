(function() {

    function __picWM({
      url = '',
      font = "26px Microsoft Yahei",
      fillStyle = 'rgba(0, 0, 0, 0.5)',
      strokeStyle = 'rgba(255, 255, 255, 0.5)',
      content = '请勿外传',
      intervalX = 80,
      intervalY = 150,
      angle = -30
    } = {}) {
      return new Promise((resolve, reject) => {

        const img = new Image();
        img.src = url;
        img.crossOrigin = 'anonymous';
        img.onload = function() {

          //创建画布
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          //获取画布句柄
          const ctx = canvas.getContext('2d');

          //绘制背景图片
          ctx.drawImage(img, 0, 0,img.width,img.height,0,0,img.width,img.height);

          //画布整体旋转
          ctx.translate(canvas.width / 2,canvas.height / 2)
          ctx.rotate(angle * Math.PI / 180);
          ctx.translate(-(canvas.width / 2),-(canvas.height / 2))
          
          //设置字体样式
          ctx.textAlign = 'start';
          ctx.textBaseline = 'top';
          ctx.font = font;
          ctx.strokeStyle = strokeStyle;
          ctx.lineWidth = "4";

          //获取最长边
          const longerSide = img.width > img.height ? img.width : img.height;

          //画布整体横向偏移量
          const offsetX = longerSide * -1;

          //画布整体纵向向偏移量
          const offsetY = longerSide * -1;

          //文字宽度
          const textWidth = ctx.measureText(content).width;

          //文字偏移量
          const offset = 100;
          
          //TODO:边界问题
          for(let j = 0,y = 0,_offset = 0;y < longerSide * 3; j+=1) {
            y = j * intervalY;
            _offset = offset * j;
            for(let i = 0,x = _offset;x < longerSide * 3; i+=1) {
              x = i * (textWidth + intervalX) + _offset;
              ctx.strokeText(content,x + offsetX,y + offsetY);
              ctx.fillStyle = fillStyle;
              ctx.fillText(content,x + offsetX,y + offsetY );
            }
          }
          
          //导出绘制后的图片
          const base64Url = canvas.toDataURL();
          resolve(base64Url)
        }
      });
    }

    //   if (typeof module != 'undefined' && module.exports) {  //CMD
    //   module.exports = __picWM;
    // } else if (typeof define == 'function' && define.amd) { // AMD
    //   define(function () {
    //     return __picWM;
    //   });
    // } else {

      window.createWaterMark = __picWM;
    //}
    
})();