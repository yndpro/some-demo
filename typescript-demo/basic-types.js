"use strict";
exports.__esModule = true;
var isDone = false;
var decLiteral = 3;
var name = "adrian";
//array
var list1 = [1, 3, 4];
var list2 = [1, 2, 3];
//enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Red;
var colorName = Color[2];
//any
var notSure = "aa";
notSure = 4;
//let prettySure: Object = 4;
//void
function warnUser() {
    console.log("This is my warning message");
}
var unusable1 = undefined; //你只能为它赋予undefined和null
//undefined和null两者各自有自己的类型分别叫做undefined和null,默认情况下null和undefined是所有类型的子类型
var u = undefined;
var n = null;
create({ prop: 0 });
create(null);
//create("saf")
//类型断言
var someValue = "this is a string";
var strLength = someValue.length;
