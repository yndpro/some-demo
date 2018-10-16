;(function(factory) {
    // CMD/SeaJS
    if(typeof define === "function") {
        define(["./m_dialog.js","./Ajax.js"],factory);
    }else if(typeof exports === 'object'){
        factory(require, exports, module);
    }
    // No module loader
    else {
        factory('', window = window || {}, '');
    }

}(function(require, exports, module) {

    var Ajax = {
        get : function(url, data, callback, options) {
            options = $.extend({
                async: true,
                dataType: 'json'
            }, options || {});
            if(userInfo.scookie){
                if(typeof data === "string"){
                    data = data + "&scookie=" + userInfo.scookie;
                }else{
                    data.scookie = userInfo.scookie;
                }
            }
            $.ajax({
                type: "GET",
                url: url,
                dataType: options.dataType,
                data: data,
                cache: false,
                async: options.async,
                success: function(result) {
                    if(typeof callback == 'function') {
                        callback(result)
                    }
                }
            });
        },
        post: function(url, data, callback, options) {
            options = $.extend({
                async: true,
                dataType: 'json'
            }, options || {});
            if(userInfo.scookie){
                if(typeof data === "string"){
                    data = data + "&scookie=" + userInfo.scookie;
                }else{
                    data.scookie = userInfo.scookie;
                }
            }
            $.ajax({
                type: "POST",
                url: url,
                dataType: options.dataType,
                data: data,
                cache: false,
                async: options.async,
                success: function(result) {
                    if(typeof callback == 'function') {
                        callback(result)
                    }
                }
            });
        }
    };

    if( {}.toString.call(module) == '[object Object]' ){
        module.exports = Ajax;
    }else{
        exports.Ajax = Ajax;
    }

}));