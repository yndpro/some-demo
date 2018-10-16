/**
 * 模态窗模块
 */
;(function(factory) {
    // CMD/SeaJS
    if(typeof define === "function") {
        define([],factory);
    }else if(typeof exports === 'object'){
        factory(require, exports, module);
    }
    // No module loader
    else {
        factory('', window, '');
    }

}(function(require, exports, module) {

    /*基础弹窗*/
    var popup = function (name, data, afterInit, afterClose) {
        var pview = this;

        return ue.dialog({
            id: "j-" + name + "_popup",
            content: baidu.template(name + 'Tmpl', data),
            lock: true,
            force: true,
            closeBtn: ".dialog-close",
            init: function () {

                var _pop = this,
                    $pop = this.obj;

                $pop.on('click','.j-confirm,.j-cancel',function(){
                    _pop.close();
                });
                typeof afterInit === "function" && afterInit.call(this);
            },
            afterClose: afterClose
        });
    };


    var PopupView =  {

        tip: function (msg) {
            popup("tip",{msg: msg},function(){
                var _pop = this;

                $(".ui-dialog-mask").unbind("click");
                _pop.timer(2000, _pop.close);
            })
        },

        /*确认框*/
        confirm: function (data,afterInit, afterClose) {
            popup("confirm",data,afterInit,afterClose);
        },

        /*礼包模态窗*/
        myaward: function (data,afterInit, afterClose) {
            popup("myaward",data,function(){
                var _pop = this,
                    $pop = this.obj;

                typeof afterInit === "function" && afterInit.call(this);

            },afterClose)
        },

        /*兑换码礼包模态窗*/
        giftCode: function (data,afterInit, afterClose) {
            var _this = this;
            popup("giftCode",data,function(){

                typeof afterInit === "function" && afterInit.call(this);
                $(".gift_code-link").bind("click",function () {
                    _this.tip("进入游戏内点击左上角头像-【兑换】-输入激活码");
                })
            },function (){
                typeof afterClose === "function" && afterClose.call(this);
                $(".gift_code-link").unbind("click");
            })
        },

        /*普通礼包模态窗*/
        giftNormal: function (data,afterInit, afterClose) {
            popup("giftNormal",data,function(){
                var _pop = this,
                    $pop = this.obj;

                typeof afterInit === "function" && afterInit.call(this);

            },afterClose)
        },

        /*表单模态窗*/
        form: function (data,afterInit, afterClose) {
            popup("form",data,afterInit,afterClose);
        },

        prob: function (afterInit, afterClose) {
            return popup("prob",{},afterInit,afterClose);
        },

        awardList: function (data,afterInit, afterClose) {
            popup("awardList",data,afterInit,afterClose);
        },

        award: function (data,afterInit, afterClose) {
            popup("award",{},afterInit,afterClose);
        }

    };

    if( {}.toString.call(module) == '[object Object]' ){
        module.exports = PopupView;
    }else{
        exports.PopupView = PopupView;
    }

}));