// 加载模块
seajs.use([
    'module2',
    'module3'
], function (module2, module3) {
    console.log("module1");
    console.log(module2.print() + module3.print());
});

console.log("11111111");