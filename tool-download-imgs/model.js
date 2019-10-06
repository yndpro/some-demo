const rp = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");

let downloadPath = "";

module.exports = {
    async getUrl(data,resolve) {
        const $ = cheerio.load(data.res); //将html转换为可操作的节点
        return resolve($);
    },
    async getPage(url) {
        return {
            url,
            res: await rp({
                url: url
            })
        };
    },
    async createDir(name,depositPath) {
        downloadPath = depositPath + name;
        if (!fs.existsSync(downloadPath)) {//查看是否存在这个文件夹
            fs.mkdirSync(downloadPath);//不存在就建文件夹
            console.log(`${name}文件夹创建成功`);
            return true;
        } else {
            console.log(`${name}文件夹已经存在`);
            return false;
        }
    },
    async downloadImage(src, index,url,host,name) {
        if(!src){
            console.log(`第${index}jpg下载失败`);
        }
        let headers = {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Cache-Control": "no-cache",
            Host: host,
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
    },
    async getImagesNum(res, name) {
        if (res) {
            let $ = cheerio.load(res);
            let len = $(".pagenavi")
                .find("a")
                .find("span").length;
            if (len == 0) {
                fs.rmdirSync(`${depositPath}${name}`);//删除无法下载的文件夹
                return 0;
            }
            let pageIndex = $(".pagenavi")
                .find("a")
                .find("span")[len - 2].children[0].data;
            return pageIndex;//返回图片总数
        }
    },
    async getTitle(res) {
        if (res) {
            let $ = cheerio.load(res);
            let title = $(".main-title")[0].children[0].data;
            return title;
        }
    },
};


