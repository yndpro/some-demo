/**
 * Created by 4399-1068 on 2017/4/7.
 * 抽奖模块
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

    var CountDown = {
        btnCountDownClass: '.zbfl-get_chance',
        btnCountDown:'.j-zbfl-get',
        time: '.j-zbfl-countdown',
        wrap : '.niudan-chance',
        ableOpenBoxClass : 'zbfl-alble',
        minute : '.countdown-h',
        second : '.countdown-s',

        defaultTime: '5',
        status: 3,
        counting: 0,
        timer: '',
        bxId: 0,
        bxTime: 0,
        bxFlag: ''
    };

    CountDown.bind = function(){
        var _this = this;

        _this.$wrap = $(_this.wrap);
        _this.$minute = $(_this.minute);
        _this.$second = $(_this.second);
        _this.$btnCountDown = $(_this.btnCountDown);

        $("span" + _this.btnCountDownClass).bind("click", function () {
            if(!userInfo.uid || userInfo.uid == 0){
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
        });

        _this.$btnCountDown.bind("click", function () {

            if(!userInfo.uid || userInfo.uid == 0){
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

            if(pageInfo.data.zbStatus.status > 0){
                _this.post();
            }else{
                PopupView.tip("直播已结束");
            }
        });
    };

    CountDown.update = function(){
        var _this = this;

        var uid = userInfo.uid,
            status = pageInfo.data.zbStatus.status,
            bxId = pageInfo.data.zbStatus.bxId;
        if(status == pageInfo.LIVE && bxId == 0 && uid){
            $(_this.btnCountDownClass).html('今日夺宝次数已领完');
            _this.$wrap.removeClass(_this.ableOpenBoxClass);
        }

        /*需要倒计时开宝箱*/
        if(status == pageInfo.LIVE && bxId){
            /*是否在倒计时*/
            if(_this.counting == 1){
                return false
            }else{
                _this.updateStatus(pageInfo.data.zbStatus);
            }
        }else{
            /*停止倒计时*/
            _this.counting = 0;
            if(status != pageInfo.LIVE){
                clearTimeout(_this.timer);
                $(_this.time).html(_this.formatTime(0));
            }
            _this.$wrap.removeClass(_this.ableOpenBoxClass);
        }
    };

    CountDown.settime = function(seconds){
        var _this = this;
        _this.formatTime(seconds);
        _this.counting = 1;

        if(seconds <= 0){
            if(!$('.' + _this.ableOpenBoxClass).length){
                _this.$wrap.addClass(_this.ableOpenBoxClass);
            }
            return false;
        }
        seconds--;
        _this.timer = setTimeout(function() {
            _this.settime(seconds);
        },1000)
    };
    CountDown.post = function(){
        var _this = this;

        Ajax.post(_zt._ztUrl+"-ajaxOpenBx",{
            _AJAX_:1,bxId:_this.bxId, flag:_this.bxFlag,time:_this.bxTime
        },function(result) {

            if (result.status < 0) {
                PopupView.tip(result.msg);
                return false;
            }

            if(result.status == 1){
                PopupView.tip(result.msg);

                var times = parseInt(LOTTERY.availableLotteryNum);
                times += 1;
                LOTTERY.availableLotteryNum = times;
                $(".j-lotte-remain").html(LOTTERY.availableLotteryNum);

                _this.counting = 0;
                _this.updateStatus(result.data);
            }

            return false;
        },'json');

    };
    CountDown.updateStatus = function(data){
        var _this = this;

        if(data.bxId){
            _this.bxId = data.bxId;
            _this.bxTime = data.time;
            _this.bxFlag = data.flag;
            _this.minutes = data.minutes;
            /*判断是否正在倒计时*/
            if(!_this.counting){
                _this.settime(_this.minutes * 60);
            }
        }else{
            $(_this.btnCountDownClass).html('今日夺宝次数已用完');
        }
        _this.$wrap.removeClass(_this.ableOpenBoxClass);
    };
    CountDown.formatTime = function (seconds) {
        var _this = this;
        var time = [
            parseInt(seconds / 60 % 60),
            parseInt(seconds % 60)
        ].join(":").replace(/\b(\d)\b/g, "0$1");
        var _arr = time.split(':');

        _this.$minute.html(_arr[0]);
        _this.$second.html(_arr[1]);
    };

    if( {}.toString.call(module) == '[object Object]' ){
        module.exports = CountDown;
    }else{
        exports.CountDown = CountDown;
    }

}));





