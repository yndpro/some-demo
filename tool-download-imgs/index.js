// let arrImgUrl = [];
// document.querySelectorAll(".swp-hd-list .swp-img").forEach((el) => {
//     let src 	= el.getAttribute("data-src");
//     let elImg 	= el.children[0];
//     if(src){
//         arrImgUrl.push(src);
//         return false;
//     }
//     if(elImg){
//         arrImgUrl.push(elImg.src);
//         return false;
//     }
// });
// console.log(arrImgUrl);


const rp = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");
const depositPath = "/Users/adrianyoung/Downloads/";
const name = "韩国美女健身教练、模特RayYang";
const url = "http://slide.sports.sina.com.cn/o/slide_2_730_200658.html?cre=picpagepc&mod=photo&loc=9&r=0&doct=0&rfunc=47&tj=none#p=2";
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