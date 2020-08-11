(function() {

    function __picWM({
      url = '',
      textAlign = 'center',
      textBaseline = 'middle',
      font = "Microsoft Yahei",
      fillStyle = 'rgba(0, 0, 0, 0.5)',
      content = '请勿外传',
      cb = null,
      textX = 100,
      textY = 30
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
          const orientation = img.width > img.height ? "horizen" : "vertical";
          const textX = img.width / 2;
          const textY = img.height / 2;
          const trim = 0;
          const ratio = 238 / 150;  
          const fontSize = parseInt((orientation === "vertical" ? img.width : (ratio * img.height)) / (content.length + trim));

          ctx.drawImage(img, 0, 0,img.width,img.height,0,0,img.width,img.height);
          ctx.textAlign = textAlign;
          ctx.textBaseline = textBaseline;
          ctx.font = fontSize + "px " + font;

          ctx.translate(canvas.width / 2,canvas.height / 2)
          ctx.rotate(-30 * Math.PI / 180);
          ctx.translate(-(canvas.width / 2),-(canvas.height / 2))

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth="4";
          ctx.strokeText(content,textX,textY);
          ctx.fillStyle = fillStyle;
          ctx.fillText(content,textX,textY);


          const base64Url = canvas.toDataURL();

          resolve(base64Url)
          //cb && cb(base64Url);
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

      window.__picWM = __picWM;
    //}
    
})();