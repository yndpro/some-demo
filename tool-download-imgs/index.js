



// var objDownloadImage = (function() {
//
// 	function downloadImage(url,filename){
//         var ele = document.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
//         	event = document.createEvent('MouseEvents');
//
//         ele.href = url;
//         ele.download = filename + new Date().getTime() + ".jpg";
//         event.initMouseEvent('click',true,false,window,0,0,0,0,0,false,false,false,false,0,null);
//         ele.dispatchEvent(event);
//     }
//
// 	return {
//
// 		/**
// 		 *   images download snippet for sina album.
// 		 */
// 		forSina : function(){
// 			var nData = document.getElementById('eData'),
// 					num = nData.children.length;
//
// 			for (var i = 0, len = num; i < len; i++) {
// 				var nImg = document.createElement("img");
// 				nImg.src = nData.children[i].getElementsByTagName("dd")[0].innerHTML;
// 				downloadImage(nImg.src, "liuxiang");
// 			}
// 		},
//
// 		/**
// 		 *   images download snippet for sina album.
// 		 */
// 		forTmall : function(){
// 			var nContent = document.getElementById('description'),
// 					nImgList = nContent.getElementsByTagName('img');
//
// 			for(var i = 0,len = nImgList.length;i < len;i++){
// 				var nImg = nImgList[i];
// 				downloadImage(nImg.src, "liuxiang");
// 			}
// 		}
// 	}
//
// })();
//
//
// objDownloadImage.forTmall();
//objDownloadImage.forSina();