/**
 * Created by 4399-1068 on 2017/4/7.
 * 礼包模块
 */
;(function(factory) {
    // CMD/SeaJS
    if(typeof define === "function") {
        define(["./m_dialog.js","./Ajax.js","./ClientBox.js","./ClientYoupai.js","./Wap.js"],factory);
    }else if(typeof exports === 'object'){
        factory(require, exports, module);
    }
    // No module loader
    else {
        factory('', window['MODULE'] = window['MODULE'] || {}, '');
    }

}(function(require, exports, module) {

    var PopupView;
    var Ajax;
    var ClientBox;
    var ClientYoupai;
    var Wap;

    if(typeof require === 'function'){
        PopupView = require("./m_dialog.js");
        Ajax = require("./Ajax.js");
        ClientBox = require("./ClientBox.js");
        ClientYoupai = require("./ClientYoupai.js");
        Wap = require("./Wap.js");
    } else {
        PopupView = window.PopupView;
        Ajax = window.Ajax;
        ClientBox = window.ClientBox;
        ClientYoupai = window.ClientYoupai;
        Wap = window.Wap;
    }

    function Gift(options){

        var defaults = {
            btn:''
        };
        this.options = $.extend(defaults,options);
        this.cache = null;

        this.init();
    }

    Gift.prototype = {

        init : function(){
            this.$btn = $(this.options.btn);
            this.bind();
        },
        
        bind : function(){
            var _this = this;
            _this.$btn.bind("click", function () {
                _this.$target = $(this);
                _this.handle();
            })
        },

        handle : function(){
            var _this = this,
                code  = _this.$target.attr('data-code'),
                name  = _this.$target.attr('data-name');


            if(!userInfo.uid || userInfo.uid == 0){
                _this.resolve({status:CONFIG.UNLOGIN});
                return false;
            }

            if(code){
                _this.resolve({status:2,data:{prizeName : name, code : code}});
                return false;
            }

            if(!_this.resolve({status:CONFIG.actstatus})) {
                return false;
            }

            _this.getPrize();
        },

        getPrize : function(){
            var _this = this,
                pid = _this.$target.attr("data-pid");

            Ajax.post(_zt._ztUrl + "-ajaxGetPrize", {_AJAX_:1,pid:pid}, function (result) {
                _this.resolve(result);
            },"json");
        },

        resolve : function(result){

            var _this = this;
            
            if (result.status == CONFIG.UNLOGIN) {

                if(appInfo.environment == appInfo.WAP){
                    Wap.login();
                }
                if(appInfo.environment == appInfo.BOX){
                    ClientBox.login();
                }
                if(appInfo.environment == appInfo.YOUPAI){
                    ClientYoupai.login();
                }
                return false;
            }

            if (result.status == CONFIG.NOTSTART) {
                PopupView.tip("活动未开始");
                return false;
            }

            if (result.status == CONFIG.GAMEOVER) {
                PopupView.tip("已结束");
                return false;
            }

            if(result.status == CONFIG.START){
                return true;
            }

            if(result.status == -3){
                PopupView.tip(result.msg);
                _this.$target.attr("data-status",result.status);
                return false;
            }

            if(result.status > 0){
                var _data = result.data;

                PopupView.giftCode({ prizeName : _data.prizeName,code : _data.code},function () {
                    var _pop = this,
                        $pop = this.obj;

                    /*复制*/

                    if(appInfo.environment == appInfo.WAP){
                        Wap.copy("#j-copy-btn");
                    }
                    if(appInfo.environment == appInfo.BOX){
                        $("#j-copy-btn").bind("click",function(){
                            ClientBox.copy($("#j-copy-code").attr("value"));
                        });
                    }
                    if(appInfo.environment == appInfo.YOUPAI){
                        $("#j-copy-btn").bind("click",function(){
                            ClientYoupai.copy($("#j-copy-code").attr("value"));
                        });
                    }


                },function () {
                   /* typeof clipboard.destroy === "function" && clipboard.destroy();*/
                });

                if(result.status == 1){
                    this.setState(_data);
                }
                return false;
            }
        },
        
        setState : function (data) {
            this.$target.attr({
                'data-code': data.code,
                'data-name': data.prizeName
            });
        }
    };

    /*function getInstanceHandle() {
        return function (options) {
            return new Gift(options);
        };
    }*/

    if( {}.toString.call(module) == '[object Object]' ){
        module.exports = Gift;
    }else{
        exports.Gift = Gift;
    }

}));



