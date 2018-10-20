const PopupView = require("./m_dialog.js");
const MyAward = require("./m_myaward.js");
const Lottery = require("./m_lottery.js");
const Ajax = require("./Ajax.js");
const ClientBox = require("./ClientBox.js");
const ClientYoupai = require("./ClientYoupai.js");
const Wap = require("./Wap.js");
const Gift = require("./m_gift.js");
const CountDown = require("./m_countdown.js");


let page = {

    /**
     * init*/
    init : function(){


        window.pauseVideo = function(){
            let video = document.getElementById("video");
            if(video){
                video.pause();
            }
        };

        if(appInfo.environment == appInfo.BOX){
            ClientBox.init();
            if(ClientBox.checkVersion(this.getAndroidVersion(), '4.5', '<=')){
                $('.view').addClass('lowVersion');
            }
            this.getInitInfo();
        }
        if(appInfo.environment == appInfo.YOUPAI){
            if(ClientBox.checkVersion(this.getAndroidVersion(), '4.5', '<=')){
                $('.view').addClass('lowVersion');
            }
            ClientYoupai.init(() => {
                this.getInitInfo();
            });
        }
        if(appInfo.environment == appInfo.WAP){
            this.getInitInfo();
        }


        /**
         * acti*/
        if (CONFIG.acstatus==CONFIG.NOTSTART) {
            PopupView.tip(CONFIG.acttit);
        }

        if (CONFIG.acstatus==CONFIG.GAMEOVER) {
            PopupView.tip(CONFIG.acttit);
        }

        if (CONFIG.acstatus==CONFIG.START) {
            Vision.init({});
        }

        this.download({btn : '.j-download'});
        this.share({btn : ".j-share"});
        this.bind();


        let optionsMyawardTemp = {
            myawardTmpl: '#myawardTmpl',
            loadingTmpl: '#loadingTmpl',
            dataTmpl: '#myawardDataTmpl',
            nodataTmpl: '#myawardNodataTmpl',
            bodyNode: '.dialog-body',
            listNode: '.myaward-list',
            itemTmpl: 'myawardItemTmpl'
        };

        let myAward = new MyAward($.extend({
            btn: '.niudan-myaward',
            urlGetMyPrizes: _zt._ztUrl + "-ajaxGetMyPrize",
            urlWriteUserInfo: _zt._ztUrl + "-ajaxWriteUserInfo"
        }, optionsMyawardTemp));
        let lottery = new Lottery({
            container : '.lotte',
            start_btn : '.niudan-start',
            multi_btn    : '.j-lotte-start10',
            target : '.niudan-container',
            prize_list : '#j-lottery-panel li',
            lottery_count : ".j-lotte-remain",
            hLottery_count : '.j-hremain',
            urlWriteUserInfo: _zt._ztUrl + "-ajaxWriteUserInfo"
        });
        myAward.bind();
        lottery.bind();
        CountDown.bind();

    },

    getInitInfo : function(){

        Ajax.post(_zt._ztUrl + '-ajaxInitBx',{_AJAX_:1},res => {
            let {pageInfo:{score,dhPrize}} = res.data;

            this.user(res);
            Exchange.init({list:dhPrize,integral:score});
            this.resolve(res);
        },"json");
    },

    user : function(res){
        let {uid,nick,pageInfo:{isShare,lastTimes}} = res.data,
            status = res.status;

        var $username = $(".j-username");
        var $loginInfo = $('.j-login-info');
        var $UnloginInfo = $('.j-unlogin-info');
        var $availableLotteryNum = $(".j-lotte-remain");

        if (status == 1 && uid > 0) {
            userInfo.uid = uid;
            userInfo.nick = nick;
            $UnloginInfo.hide();
            $loginInfo.show();
            $username.html(userInfo.nick);

            LOTTERY.availableLotteryNum = lastTimes;
            $availableLotteryNum.html(LOTTERY.availableLotteryNum);

            userInfo.isShare = isShare;
        } else {
            $loginInfo.hide();
            $UnloginInfo.show();
            $username.html('');

            LOTTERY.availableLotteryNum = '0';
            $availableLotteryNum.html(LOTTERY.availableLotteryNum);

            userInfo.isShare = false;
        }
    },

    getData : function(){
        Ajax.post(_zt._ztUrl + "-ajaxGetZbList",{_AJAX_:1},res => {

            this.resolve(res);
        },'json');
    },

    resolve : function(res){

        pageInfo.olddata = pageInfo.data;
        pageInfo.data = res.data;

        let {zbStatus,zbList} = pageInfo.data;

        Vision.render({zbList:zbList,zbStatus:zbStatus});
        CountDown.update();

        if(CONFIG.actstatus > 0){
            let minite = zbStatus.freshBlank;
            if(minite && minite >= 1){
                setTimeout(this.getData.bind(this),minite * 60 * 1000);
            }
        }
    },

    /**
     * event*/
    bind : function(){
        var $body = $('body');

        $body.on('click','.j-login-btn',function(){
            if(appInfo.environment == appInfo.WAP){
                Wap.login();
            }
            if(appInfo.environment == appInfo.BOX){
                ClientBox.login();
            }
            if(appInfo.environment == appInfo.YOUPAI){
                ClientYoupai.login();
            }
        });
        $body.on('click','.j-logout-btn',function(){
            if(appInfo.environment == appInfo.WAP){
                Wap.logout();
            }
        });
        $body.on('click','.ssjl-item,.lbdh-item .item-cover',function(){
            var _detail = $(this).find(".item-more").attr("data-detail");
            if(_detail) PopupView.awardList({list : _detail.split("|")});
        });
        $body.on('click','.j-goto-live',function(){
            if(appInfo.zbId) document.location.href = "protocol://toMobileLive?id=" + appInfo.zbId;
            return false
        });
        $body.on('click','.niudan-prob',function(){
            PopupView.prob();
        });
        $body.on('click','.niudan-award',function(){
            PopupView.award();
        });

    },
    /**
     * 下载
     */
    download : function (options) {
        var $body = $('body');
        if(appInfo.environment == appInfo.WAP){
            $body.on('click',options.btn,function(){
                window.location.href = appInfo.checkIphone == "1" ? appInfo.downloadUrlForIos : appInfo.downloadUrlForAdroid;
            });
        }
        if(appInfo.environment == appInfo.BOX){
            ClientBox.download({btn:options.btn});
        }
        if(appInfo.environment == appInfo.YOUPAI){
            $(options.btn).hide();
        }
    },
    /**
     * 分享
     */
    share : function (options) {
        var $body = $('body');

        var postShare = function () {
            if(!userInfo.isShare){
                Ajax.post(_zt._ztUrl + '-ajaxShare',{_AJAX_:1}, function (result) {
                    let {status,data:{lastTimes},msg} = result;
                    if(status == 1){
                        LOTTERY.availableLotteryNum = lastTimes;
                        $(".j-lotte-remain").html(LOTTERY.availableLotteryNum);
                    }
                });
            }
        };

        if(appInfo.environment == appInfo.YOUPAI){
            $body.on('click',options.btn,function(e){
                if(!userInfo.uid || userInfo.uid == 0){
                    ClientYoupai.login();
                    return false;
                }
                ClientYoupai.shareCustom({
                    "title" : shareInfo.title,
                    "content" : shareInfo.desc,
                    "iconUrl" : shareInfo.img,
                    "redirectUrl" : shareInfo.url
                });
                postShare();
                return false;
            });
        }
        if(appInfo.environment == appInfo.BOX){

            var shareCallback = function(param){
                if(param.shareResult == 1){
                    postShare();return false;
                }
                /*if(param.shareResult == 0){
                    PopupView("分享取消");return false;
                }
                if(param.shareResult == -1){
                    PopupView("分享失败");return false;
                }*/
            };
            ClientBox.shareCustom({
                "shareTitle": shareInfo.title,
                "shareIcon": shareInfo.img,
                "shareUrl": shareInfo.url,
                "shareContent": shareInfo.desc
            },options.btn,shareCallback);
        }
    },

    getAndroidVersion() {
        var ua = navigator.userAgent.toLowerCase();
        var version = null;
        if (ua.indexOf("android") > 0) {
            var reg = /android [\d._]+/gi;
            var v_info = ua.match(reg);
            version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
            version = parseInt(version.split('.')[0]);
        }
        return version;
    }

};

/**
 * 积分兑换
 */
var Exchange = {

    $integral : $('.j-integral'),
    $body : $('body'),
    $list : $('.lbdh-list'),

    init : function({list,integral}){

        userInfo.integral = integral;
        this.$integral.html(integral);
        if(list) this.$list.html(baidu.template('exchangeListTmpl',{list : list}));

        let ExchangeGift = this.getExchangeGift();

        this.getInstance(ExchangeGift,{
            'btn':'.j-dh-get'
        });
    },

    getExchangeGift : function(){
        let _this = this;

        function ExchangeGift(options){
            Gift.call(this,options);
        }
        ExchangeGift.prototype = new Gift();
        ExchangeGift.prototype.constructor = ExchangeGift;
        ExchangeGift.prototype.handle = function () {
            let ctx = this,
                code  = ctx.$target.attr('data-code'),
                name  = ctx.$target.attr('data-name');

            ctx.point = parseInt(ctx.$target.attr("data-point"));

            if(!userInfo.uid || userInfo.uid == 0){
                ctx.resolve({status:CONFIG.UNLOGIN});
                return false;
            }

            if(!ctx.resolve({status:CONFIG.actstatus})) {
                return false;
            }

            if(code){
                ctx.resolve({status:2,data:{prizeName : name, code : code}});
                return false;
            }

            if(userInfo.integral < ctx.point){
                PopupView.confirm({
                    'title':'您的积分不足，无法兑换该礼包',
                    'text':'（您可在赛事直播期间，进行夺宝抽奖获得礼包兑换积分！）',
                    'btnList':['confirm']
                });
                return false;
            }

            PopupView.confirm({
                'title' : '该礼包需要消耗' + ctx.point + '积分进行兑换',
                'btnList' : ['confirm','cancel']
            },function () {
                $('.j-confirm').unbind('click').bind('click',function () {
                    ctx.getPrize();
                });
            });
        };
        ExchangeGift.prototype.setState = function (data) {
            let ctx = this;

            ctx.$target.addClass("geted");
            ctx.$target.attr({
                'data-code': data.code,
                'data-name': data.prizeName
            });
            userInfo.integral -= ctx.point;
            _this.$integral.html(userInfo.integral);
        };
        return ExchangeGift;
    },

    getInstance: function(constructor,options){
        return new constructor(options);
    }


};
/**
 * 视频/列表 模块
 */
var Vision = {

    data : null,
    $wrap : $('.sszb-wrap'),
    $scheduleList : $('.sclb-list'),

    formatDate : function(time){
        var str1 = time.replace("-","月");
        return str1.replace(" ","日 ");
    },

    render : function({zbList,zbStatus}){
        var _this = this;
        var _html = "";

       this.dataOld = this.data;
       this.data = {zbList:zbList,zbStatus:zbStatus};

       if(zbStatus.zbId){
           appInfo.zbId = zbStatus.zbId;
       }

        if(appInfo.environment == appInfo.YOUPAI && appInfo.zbId && !$(".j-goto-live").length){
            this.$wrap.after(`<a href="javascript:;" class="sszb-goyoupai j-goto-live"></a>`);
        }

        if(zbList){
            _this.$scheduleList.html(baidu.template('scheduleTmpl',{list:zbList}));
        }

        $('.mod--sszb .mod-tit').html(`${/^[\u4e00-\u9fa5]{2}/.exec(zbStatus.headTit)}<span>${/[\u4e00-\u9fa5]{2}$/.exec(zbStatus.headTit)}</span><i class="mod-bullet-r"></i>`);

        if(zbStatus.status == pageInfo.LIVE){               /*当前是直播*/
            if(_this.dataOld && zbStatus.yp == pageInfo.olddata.zbStatus.yp){
                return false
            }
            _html = baidu.template('youpaiTmpl',zbStatus);
            _this.$wrap.html(_html);
        }else if(zbStatus.status == pageInfo.PLAY_BACK){      /*当前回放*/
            if(_this.dataOld && zbStatus.spUrl == _this.dataOld.zbStatus.spUrl){
                return false
            }
            _html = baidu.template('videoTmpl',zbStatus);
            _this.$wrap.html(_html);
        }else{
            _this.$wrap.html(`<img width="100%" height="100%" alt="" src=${zbStatus.defImg}>`);/*维护*/
        }

    }
};

$('body').ready(function () {
   
    page.init();
});











