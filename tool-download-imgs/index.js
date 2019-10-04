const rp = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");
const depositPath = "/Users/adrianyoung/Downloads/";
const name = "一组来自模特美女娜娜的运动美照";
const url = "http://slide.sports.sina.com.cn/o/slide_2_730_226298.html#p=2";
let downloadPath = "";


async function getPage(url) {
    const data = {
        url,
        res: await rp({
            url: url
        })
    };
    return data;
}

async function getUrl(data) {
    let list = [];
    const $ = cheerio.load(data.res); //将html转换为可操作的节点
    $("#eData dl").each((i,e) => {
        list.push($(e).find("dd").eq(0).html()); //输出目录页查询出来的所有链接地址
    });
    return list;
}

async function createDir(path,name) {
    downloadPath = path + name;
    if (!fs.existsSync(downloadPath)) {//查看是否存在这个文件夹
        fs.mkdirSync(downloadPath);//不存在就建文件夹
        console.log(`${name}文件夹创建成功`);
        return true;
    } else {
        console.log(`${name}文件夹已经存在`);
        return false;
    }
}

async function downloadImage(src, index) {
    if(!src){
        console.log(`第${index}jpg下载失败`);
    }
    let headers = {
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
        Host: "n.sinaimg.cn",
        Pragma: "no-cache",
        "Proxy-Connection": "keep-alive",
        Referer: url,
        "Upgrade-Insecure-Requests": 1,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.19 Safari/537.36"
    };//反防盗链
    await rp({
        url: src,
        resolveWithFullResponse: true,
        headers
    }).pipe(fs.createWriteStream(`${downloadPath}/${name}${index}.jpg`));//下载
    console.log(`${downloadPath}/${index}.jpg下载成功`);
}

async function main() {
    const data = await getPage(url);
    const list = await getUrl(data);
    await createDir(depositPath,name);
    list.forEach((src,index) => {
        downloadImage(src, index)
    })
}

main();




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