const model= require('./model');
const name = "一组来自普拉提健身美女老师subin小姐姐的运动高美拍";
const url = "http://slide.sports.sina.com.cn/o/slide_2_730_251599.html#p=3";
const host = "n.sinaimg.cn";
const depositPath = "/Users/adrianyoung/Downloads/sina/";

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