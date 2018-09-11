define(function (require, exports, module) {
    console.log("module21")

    var module4 = require('module4');
    var module5 = require('module5');

    console.log("module2");

    module.exports = {
        print : function(){
            return 2 + module4.print() + module5.print();
        }
    };
});