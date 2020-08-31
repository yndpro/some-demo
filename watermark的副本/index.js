(function() {

    function __picWM({
      url = '',
      font = "Microsoft Yahei",
      fillStyle = 'rgba(0, 0, 0, 0.5)',
      content = '请勿外传'
    } = {}) {
      return new Promise((resolve, reject) => {

        const img = new Image();
        img.src = url;
        img.crossOrigin = 'anonymous';
        img.onload = function() {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          const fontSize = 26;
          ctx.drawImage(img, 0, 0,img.width,img.height,0,0,img.width,img.height);

          ctx.translate(canvas.width / 2,canvas.height / 2)
          ctx.rotate(-30 * Math.PI / 180);
          ctx.translate(-(canvas.width / 2),-(canvas.height / 2))
          
          ctx.textAlign = 'start';
          ctx.textBaseline = 'top';
          ctx.font = fontSize + "px " + font;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth="4";

          const offsetX = img.width * -1;
          const offsetY = img.height * -1;
          for(let j = 0,y = 0 + offsetY;y = (j * 150)+ offsetY,y<img.height * 2; j+=1) {
            for(let i = 0,x = (100 * j) + offsetX;x = (i * 282) + (100 * j) + offsetX,x<img.width * 2; i+=1) {
              ctx.strokeText(content,x,y);
              ctx.fillStyle = fillStyle;
              ctx.fillText(content,x,y);
            }
          }
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