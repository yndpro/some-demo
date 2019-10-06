const model= require('./model');

const name = "北京巅峰啦啦队备战新赛季";
const url = "http://slide.sports.sina.com.cn/cba/slide_2_792_229658.html#p=4";
const host = "n.sinaimg.cn";
const depositPath = "/Users/adrianyoung/Downloads/";

async function main() {

    const data = await model.getPage(url);
    const list = await model.getUrl(data,$=>{
        let list = [];
        $("#eData dl").each((i,e) => {
            list.push($(e).find("dd").eq(0).html()); //输出目录页查询出来的所有链接地址
        });
        return list;
    });
    await model.createDir(name,depositPath);
    list.forEach((src,index) => {
        model.downloadImage(src, index,url,host,name)
    })

}

main();