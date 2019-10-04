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
// objDownloadImage.forSina();


// const prefix = "韩国女星刘小英";
// const eleList = ["http://n.sinaimg.cn/sports/2_img/upload/cf0d0fdd/272/w936h936/20190626/5bac-hyvnhqr0650927.jpg", "http://n.sinaimg.cn/sports/2_img/upload/cf0d0fdd/358/w579h579/20190626/0323-hyvnhqr0650930.jpg", "http://n.sinaimg.cn/sports/2_img/upload/cf0d0fdd/784/w792h792/20190626/d289-hyvnhqr0650947.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/320/w640h480/20190626/c546-hyvnhqr0306497.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/313/w640h473/20190626/2b6f-hyvnhqr0306512.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/247/w600h447/20190626/a195-hyvnhqr0306528.png", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/640/w640h800/20190626/5586-hyvnhqr0306556.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/480/w640h640/20190626/21a3-hyvnhqr0306622.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/174/w400h574/20190626/f723-hyvnhqr0306664.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/480/w640h640/20190626/f398-hyvnhqr0306666.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/480/w640h640/20190626/842b-hyvnhqr0306671.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/319/w640h479/20190626/ebc9-hyvnhqr0306681.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/480/w640h640/20190626/c1d3-hyvnhqr0306722.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/480/w640h640/20190626/011e-hyvnhqr0306740.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/480/w640h640/20190626/3bb3-hyvnhqr0306745.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/480/w640h640/20190626/bbbb-hyvnhqr0306753.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/480/w640h640/20190626/8da7-hyvnhqr0306764.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/480/w640h640/20190626/2947-hyvnhqr0306779.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/640/w640h800/20190626/1f01-hyvnhqr0306840.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/480/w640h640/20190626/b6f2-hyvnhqr0306845.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/279/w478h601/20190626/7920-hyvnhqr0306852.png", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/260/w468h592/20190626/f7e9-hyvnhqr0306858.png", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/279/w479h600/20190626/48b6-hyvnhqr0306871.png", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/770/w443h327/20190626/3d5b-hyvnhqr0306875.jpg", "http://n.sinaimg.cn/sports/2_img/upload/0e5a88a6/459/w548h711/20190626/f70b-hyvnhqr0306942.jpg"];
// if(prefix && eleList.length > 0){
// 	eleList.forEach((url,index)=>{
// 		downloadImg(url, prefix + index)
// 	})
// }
//
// function downloadImg(url, name) {
// 	// 将链接地址字符内容转变成blob地址
// 	fetch(url).then(res => res.blob()).then((blob) => {
// 		// 创建隐藏的可下载链接
// 		const a = document.createElement('a');
// 		a.style.display = 'none';
// 		a.href = URL.createObjectURL(blob);
// 		a.download = name;
// 		document.body.appendChild(a);
// 		a.click();
// 		// 移除元素
// 		document.body.removeChild(a);
// 	});
// }