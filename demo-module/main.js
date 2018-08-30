const test = require('./test.js');


console.log(test)



//简单实例(模拟)：
// var module = {
//     exports : {}
// };
// (function(module, exports){

//     exports.mult10 = function(n){ return n * 10 };

// }(module, module.exports))
// console.log(module.exports.mult10(5))




// CommonJS 扩展了JavaScript声明模块的API.
// 浏览器不兼容CommonJS的根本原因，在于缺少四个Node.js环境的变量 (module  exports  require  global)
// 同步载入模块

// CommonJS创建了两份模块的实例 一个在导出的时候，一个在引入的时候


