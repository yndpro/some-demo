;(function(factory) {
    // CMD/SeaJS
    if(typeof define === "function") {
        define(["./m_dialog.js"],factory);
    }else if(typeof exports === 'object'){
        factory(require, exports, module);
    }
    // No module loader
    else {
        factory('', window = window || {}, '');
    }

}(function(require, exports, module) {

    var PopupView;

    if(typeof require === 'function'){
        PopupView = require("./m_dialog.js");
    } else {
        PopupView = window.PopupView;
    }

    var ClientYoupai = {
        init : function(callback){
            window.setLoginInfo = function (token, authCode,uid,nick,avatar,level){
                var _arr = Array.prototype.slice.call(arguments);
                if(_arr[0] == ""){
                    userInfo.scookie = "";
                }else{
                    userInfo.scookie = _arr.join("|");
                }
                typeof callback == "function" && callback();
            };
            document.location.href = "protocol://setLoginInfo";
        },
        login: function() {
            if(!userInfo.scookie){
                document.location.href = "protocol://toLogin";return false;
            }
        },
        copy : function(str){
            window.setClipboard = function(isSuccess,msg){
                if(isSuccess){
                    PopupView.tip("已复制到剪切板");
                }else{
                    PopupView.tip(msg);
                }
            };
            document.location.href = "protocol://setClipboard?content=" + encodeURI(str);
        },
        shareCustom : function (param) {
            var str = "";
            for(var key in param){
                /*if(key == "iconUrl" || key == "redirectUrl"){*/
                param[key] = encodeURI(param[key]);
                /*}*/
                str += "&" + key + "=" + param[key];
            }
            document.location.href = "protocol://toCustomShare?" + str.substr(1);
        }
    };

    if( {}.toString.call(module) == '[object Object]' ){
        module.exports = ClientYoupai;
    }else{
        exports.ClientYoupai = ClientYoupai;
    }
}));