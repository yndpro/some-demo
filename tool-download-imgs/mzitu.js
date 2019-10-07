const model= require('./model');

const basicPath = "https://www.mzitu.com/11062";
const host = "i5.meizitu.net";
const depositPath = "/Users/adrianyoung/Downloads/";

const main = async _url => {
    let page = await model.getPage(_url);
    let name = await model.getTitle(page.res);
    let imageNum = await model.getImagesNum(page.res,name);//获取这组图片的数量
    await model.createDir(name,depositPath);
    for (let i = 1; i <= imageNum; i++) {
        let url = i === 1 ? _url : _url + `/${i}`;
        let data = await model.getPage(url);//遍历获取这组图片每一张所在的网页
        let src = await model.getUrl(data,$ =>{
            return $(".main-image").find("img")[0].attribs.src;
        });
        await model.downloadImage(src,i,url,host,name);//下载
    }
};

main(basicPath);

const role = {
    '许诺Sabrina':'https://www.mzitu.com/tag/xunuo/',
    '刘奕宁':'https://www.mzitu.com/tag/liuyining/',
    '筱慧':'https://www.mzitu.com/tag/xiaohui/',
    'Sugar小甜心(杨晨晨)':'https://www.mzitu.com/tag/xiaotianxin-gugar/',
    '周于希':'https://www.mzitu.com/tag/zhouyuxi-dummy/',
    '唐婉儿':'https://www.mzitu.com/tag/tangwaner/',
    '谢芷馨(绯月樱)':'https://www.mzitu.com/tag/xiezhixin/',
    '刘钰儿':'https://www.mzitu.com/tag/liuyuer/',
    '何晨曦':'https://www.mzitu.com/tag/hechenxi/',
    '于姬Una':'https://www.mzitu.com/tag/yuji-una/',
    '土肥圆矮挫穷(周妍希)':'https://www.mzitu.com/tag/tufeiyuanai/',
    '穆菲菲':'https://www.mzitu.com/tag/mufeifei/',
    '琳琳ailin(小沫琳)':'https://www.mzitu.com/tag/linlin-ailin/',
    '宋KiKi':'https://www.mzitu.com/tag/song-kiki/',
    'Luffy菲菲':'https://www.mzitu.com/tag/luffy-feifei/',
    '王婉悠':'https://www.mzitu.com/tag/wangwanyou/',
    '顾欣怡':'https://www.mzitu.com/tag/guxinyi/',
    '卓娅祺':'https://www.mzitu.com/tag/zhuoyaqi/'
};
