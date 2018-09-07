(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var module2 = require('./module2');
var module3 = require('./module3');

console.log('module1');
console.log(module2.print() + module3.print());
},{"./module2":2,"./module3":3}],2:[function(require,module,exports){
var module2 = {
    print : function(){
        return 2
    }
}

console.log("module2")

module.exports = module2;
},{}],3:[function(require,module,exports){
var module3 = {
    print : function(){
        return 3
    }
}

console.log("module3")

module.exports = module3;
},{}]},{},[1]);
