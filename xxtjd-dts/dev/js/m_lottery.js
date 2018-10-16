/**
 * Created by 4399-1068 on 2017/4/7.
 * 抽奖模块
 */
;(function(factory) {
    // CMD/SeaJS
    if(typeof define === "function") {
        define(["./m_dialog.js","./m_myaward.js","./Ajax.js","./ClientBox.js","./ClientYoupai.js","./Wap.js"],factory);
    }else if(typeof exports === 'object'){
        factory(require, exports, module);
    }
    // No module loader
    else {
        factory('', window['MODULE'] = window['MODULE'] || {}, '');
    }

}(function(require, exports, module) {

    var PopupView;
    var MyAward;
    var Ajax;
    var ClientBox;
    var ClientYoupai;
    var Wap;

    if(typeof require === 'function'){
        PopupView = require("./m_dialog.js");
        MyAward = require("./m_myaward.js");
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
        MyAward = window.MODULE.MyAward;
    }


    function draw(callback){

        for(var i=1;i<=8;i++){
            $(".qiu_"+i).addClass("wieyi_"+i);
        }

        setTimeout(function (){
            for(var i=1;i<=8;i++){
                $(".qiu_"+i).removeClass("wieyi_"+i);
            }
            /*setTimeout(function (){*/
                callback();
            /*},900);*/
        },1500);

        //取消动画
        /*setTimeout(function (){
            $(".niudan_hole").find("img").removeClass("niudan-out");
        },3500)*/
    }


    function Lottery(options){
        var _this = this;

        var defalts = {
            container : '.cjfl-lotte',/*抽奖转盘的容器*/
            start_btn : '.j-lotte-start',/*抽奖开始按钮*/
            multi_btn    : '.j-lotte-start10',/*十连抽抽奖开始按钮*/
            target : '#j-lottery-panel',/*奖品列表容器*/
            prize_list : '#j-lottery-panel li',/*奖品列表*/
            lottery_count : ".j-lotte-remain"/*剩余可抽奖次数*/
        };
        this.options = $.extend(defalts,options);

        /*继承MyAward实例属性*/
        MyAward.call(this,this.options);

        /*初始化*/
        this.$container = $(this.options.container);
        this.$start_btn = $(this.options.start_btn);
        this.$multi_btn = $(this.options.multi_btn);
        this.$target = $(this.options.target);
        this.$prize_list = $(this.options.prize_list);
        this.$lottery_count = $(this.options.lottery_count);
        /* 已抽奖次数 */
        this.$hLottery_count = $(this.options.hLottery_count);

        /*初始化转盘*/
        /*this.lottery = new ACTIVITY.Turntable({
            prizeLength: _this.$prize_list.length,//奖品列表数量
            onUpdate: function (current) {
                _this.$target[0].className = 'lotte-table entity_lottery_cur' + (current + 1);
            }
        });*/

        /*this.niudan = new window.MODULE.Niudan({

        })*/

    }


    /*继承MyAward原型属性*/
    Lottery.prototype = new MyAward();
    Lottery.prototype.constructor = Lottery;

    Lottery.prototype.bind = function(){
        var _this = this;

        var handle = function(target){

            /*if(_this.$container.hasClass("lottery_running")){
                return false;
            }*/

            var times = parseInt( target.attr("data-times") ) || 1;
            /*在这里做未登录判断和抽奖机会判断可以减少用户非必要的等待时间和网络请求*/

            /*活动还未开启*/
            if(CONFIG.actstatus == CONFIG.NOTSTART){
                _this.handleLottery({status: CONFIG.NOTSTART});
                return false;
            }

            /*活动已经结束*/
            if(CONFIG.actstatus == CONFIG.GAMEOVER){
                _this.handleLottery({status: CONFIG.GAMEOVER});
                return false;
            }


            /*登录判断*/
            if(!userInfo.uid || userInfo.uid == 0){
                _this.handleLottery({status: CONFIG.UNLOGIN});
                return false;
            }
           

            /*if (_this.$container.hasClass("lottery_running")) {
                return false;
            }*/
            /*抽奖机会不够*/
            if (+LOTTERY.availableLotteryNum < parseInt( target.attr("data-times") )) {
                _this.handleLottery({status: LOTTERY.NOCHANCE});
                return;
            }

            if(times==10){
                PopupView.confirm({
                    'title' : '您确定要进行10连抽吗?'
                });
                $(".j-confirm").bind("click",function(){
                    handF(times);
                });
            }else{
                handF(times);
            }
        };

        var handF = function(times){
            _this.$start_btn.addClass("lottery_running");
            /*_this.lottery.start();*/
            draw(function () {
                _this.getLottery(times);
            });

        };

        /*单次抽*/
        _this.$start_btn.bind("click",function(){
            if(_this.$start_btn.hasClass("lottery_running")){
                return false;
            }
            handle($(this));
        });

        /*十连抽*/
        if(_this.$multi_btn){
            _this.$multi_btn.bind("click", function(){
                var $this = $(this);

                if(_this.$start_btn.hasClass("lottery_running")){
                    return false;
                }
               
                handle($this);
                return false
            })
        }
    };

    //获取抽奖数据
    Lottery.prototype.getLottery = function(times){
        var _this = this;

        Ajax.post(_zt._ztUrl + "-ajaxLottery",{'_AJAX_':1,'times':times}, function (result) {

            /*抽奖未成功*/
            if(result.status <= 0){
                _this.handleLottery(result);
                return;
            }

            var $prized_items = _this.$target.find("img:[data-prize=" + result.data.prizeList[0].pid + "]"),
                imgUrl = $prized_items.attr("src"),
                $img = $(".niudan_hole").find("img");

            $img.attr("src",imgUrl);
            $img.load(function () {
                console.log("1");
                $img.addClass("niudan-out");

                setTimeout(function () {
                    _this.$start_btn.removeClass("lottery_running");
                    _this.handleLottery( result, times);
                },1000);

            });

        }, "json");
    };

    /*抽奖结果处理*/
    Lottery.prototype.handleLottery = function ( result, times) {
        var _this = this;

        _this.$container.removeClass("lottery_running");
/*
        if (index == -1) {
            _this.$target[0].className = 'lotte-table entity_lottery';
        }*/

        /*未登录判断*/
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

        /*活动未开始*/
        if (result.status == CONFIG.NOTSTART) {
            PopupView.tip("活动未开始");
            return;
        }

        /*已结束*/
        if (result.status == CONFIG.GAMEOVER) {
            PopupView.tip("活动已结束");
            return;
        }

        /*没有抽奖机会*/
        if (result.status == LOTTERY.NOCHANCE) {
            /*更新剩余的抽奖次数*/
           /* _this.updateTimes(times);*/

            var _pop = ue.dialog.list["j-confirm_popup"];
            if(_pop){
                _pop.close();
            }

            PopupView.confirm({
                'title':'夺宝次数不足，无法夺宝',
                'text':'观看直播，分享专题即可获得夺宝次数',
                'btnList':['confirm']
            });
            return;
        }

        /*其他抽奖未成功*/
        if(result.status <= 0){
            PopupView.tip(result.msg);
            return;
        }

        var data = result.data;

        /*中奖了 index>=0 且 prize非0*/
        /*中连抽*/
        if(times > 1){
            /*弹出列表模态窗*/
            PopupView.myaward({
                contentTmpl: $(_this.options.loadingTmpl).html()
            },function(){
                var _pop = ue.dialog.list["j-myaward_popup"];
                /*渲染列表*/
                _this.renderList(data,1);
                /*缓存列表信息*/
                _this.infoList[1] = data;
                $('.dialog-title').html("恭喜您，获得了");
                _pop.reset();
            },function(){
                $('.j-myawardWatch').unbind('click');
            });

            _this.updateTimes(data.lastTimes);
            return;
        }

        /*中单次*/
        var _data = data.prizeList[0];
        if(_data.kind == 0){
            PopupView.confirm({
                'title':'夺宝失败，请继续努力~',
                'btnList':['confirm']
            },function () {},function () {
                $(".niudan_hole").find("img")
                    .unbind("load")
                    .attr("src","")
                    .removeClass("niudan-out");
            });
        }
        if (_data.kind == AWARD.GIFT) {

            PopupView.giftCode(_data,function () {
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
                $(".niudan_hole").find("img")
                    .unbind("load")
                    .attr("src","")
                    .removeClass("niudan-out");
            });
        }
        if(_data.kind == AWARD.UNNEED_UINFO){
            userInfo.integral = data.score;
            $(".j-integral").html(userInfo.integral);
            PopupView.giftNormal(_data,function () {},function () {
                $(".niudan_hole").find("img")
                    .unbind("load")
                    .attr("src","")
                    .removeClass("niudan-out");
            })
        }
        if (_data.kind == AWARD.NEED_UINFO) {
            _data.uinfo = null;
            _data.fst = 1;
            _this.form(_data);
        }
        if (_data.kind == AWARD.COLLECTIONS) {
            _this.games(_data);
        }

        _this.updateTimes(data.lastTimes);

    };

    Lottery.prototype.updateTimes = function(lastTimes){
        var _this = this;
        LOTTERY.availableLotteryNum = lastTimes;
        _this.$lottery_count.html(lastTimes);
    };


    /*function getInstanceHandle() {
        return function (options) {
            return new MyAward(options);
        };
    }*/

    if( {}.toString.call(module) == '[object Object]' ){
        module.exports = Lottery;
    }else{
        exports.Lottery = Lottery;
    }

}));





