const model= require('./model');
const name = "一组来自网红美女Ruoyu小姐姐的运动美拍";
const url = "http://slide.sports.sina.com.cn/o/slide_2_730_251282.html#p=8";
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