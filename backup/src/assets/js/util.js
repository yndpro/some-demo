const util = {
    isArray : function(o){return Object.prototype.toString.call(o) === '[object Array]';},
    isObject : function(o){return Object.prototype.toString.call(o) === '[object Object]';},
    getCookie : function (name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)) return unescape(arr[2]);
        else return null;
    },
    delCookie : function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        document.cookie = name + "=''; expires=" + exp.toGMTString()+"; path=/;domain=4399.cn;";
    }
};

window.util = util;