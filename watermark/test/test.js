//import {createWaterMark} from '../release/index.js';
const createWaterMark = require('../release/index.js');
console.log(window.createWaterMark);
const verImgUrl = 
  "https://images.unsplash.com/photo-1594638887412-be2eba65bda7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80";
const horiImgUrl =
  "https://images.unsplash.com/photo-1594502645146-919ab24010e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80";

createWaterMark({
  url: event.target.result,
  content: "仅供4399家长监护平台身份证使用",
  success: base64Url=>{
    console.log(base64Url);
  }
})

// window.change = (target) => {
//   const file = target.files[0];
//   const formatReg = /\.(jpg|jpeg|png)$/i;

//   if (!file) {
//     return;
//   }

//   if (file.name.search(formatReg) === -1) {
//     alert("请选择正确的文件类型");
//     return;
//   }

//   if (file.size / 1024 / 1024 > 4) {
//     alert("图片大小不能超过4M哦~");
//     return;
//   }

//   var reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = function(event) {
//     console.log(event.target.result);
//     //添加水印
    
//       // .then(base64Url => {
//       //   //回显图片
        

//       //   var fileWithWaterMark = dataURLtoFile(base64Url, file.name);

//       //   //压缩图片
//       //   return window.imageConversion.compressAccurately(fileWithWaterMark, {
//       //     size: 4000, //The compressed image size is 100kb
//       //     accuracy: 0.9 //the accuracy of image compression size,range 0.8-0.99,default 0.95;
//       //     //this means if the picture size is set to 1000Kb and the
//       //     //accuracy is 0.9, the image with the compression result
//       //     //of 900Kb-1100Kb is considered acceptable;
//       //   });
//       // })
//       // .then(blob => {
//       //   //blob 转 file
//       //   var defile = new window.File([blob], file.name, { type: file.type });

//       //   console.log(defile);
//       //   //upload(defile)
//       // });
//   };
// }
