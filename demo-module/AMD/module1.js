// require.config({
//     paths: {
//         "jquery": "lib/jquery.min",
//         "underscore": "lib/underscore.min",
//         "backbone": "lib/backbone.min"
//     }
// });

// 加载模块
require([
    'module2',
    'module3'
], function (module2, module3) {
    console.log("module1");
    console.log(module2() + module3());
});

console.log("11111111");