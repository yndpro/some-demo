const model = require("./model");
const name = "一组来自健身美女敏敏的运动美拍";
const url = "http://slide.sports.sina.com.cn/o/slide_2_730_253019.html#p=4";
const host = "n.sinaimg.cn";
const depositPath = "/Users/adrianyoung/Downloads/sina/";

async function main() {
  const data = await model.getPage(url);
  const list = await model.getUrl(data, $ => {
    let list = [];
    $("#eData dl").each((i, e) => {
      list.push(
        $(e)
          .find("dd")
          .eq(0)
          .html()
      ); //输出目录页查询出来的所有链接地址
    });
    return list;
  });
  await model.createDir(name, depositPath);
  list.forEach((src, index) => {
    model.downloadImage(src, index, url, host, name);
  });
    
}

main();
