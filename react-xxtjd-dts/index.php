<{template file=_header dir=cn}>
<{css %cn%/4399cn/xxtjd/dts/release/css/style.css group=2 fixed=1}>
<script>
    dw();
    window.onresize=function(){dw()};
    function dw(){
        var deviceWidth = document.documentElement.clientWidth;
        if(deviceWidth > 750)
            deviceWidth = 750;
        document.documentElement.style.fontSize = deviceWidth / 6.4 + "px";
    }
</script>
<div class="view">
    <div class="wrap">
    <div class="head">
        <div class="bg1"></div>
        <div class="bg2"></div>
        <div class="bg3"></div>
    </div>
    <div class="container">
        <a href="javascript:;" target="_blank" class="btn--download j-download">游戏下载</a>
        <div class="time"><{$tplCfg.ymnr.bmsj}></div>
        <div class="mod mod--sszb">
            <div class="mod-hd">
                <h2 class="mod-tit">赛事<span>直播</span><i class="mod-bullet-r"></i></h2>
            </div>
            <div class="mod-bd">
                <div class="sszb-wrap">
                    <div class="sszb-cont"></div>
                </div>
            </div>
        </div>
        <div class="mod mod--sclb">
            <div class="mod-hd">
                <h2 class="mod-tit">赛程<span>列表</span><i class="mod-bullet-l"></i></h2>
            </div>
            <div class="mod-bd">
                <ul class="sclb-list">
                </ul>
            </div>
        </div>
        <div class="mod mod--zbfl">
            <div class="mod-hd">
                <h2 class="mod-tit">直播<span>福利</span><i class="mod-bullet-r"></i></h2>
                <div class="mod-stit j-zbfl-countdown"><span class="countdown-h">0 0</span>:<span class="countdown-s">0 0</span></div>
            </div>
            <div class="mod-bd">
                <div class="zbfl-niudan niudan">
                    <div class="niudan-chance">
                        比赛日，观看直播每满足：5分钟即可领取一次夺宝机会！（<span>先登录账号才能获取次数！</span>）
                        <span class="zbfl-get_chance">领取夺宝次数</span>
                        <a href="javascript:;" class="zbfl-get_chance j-zbfl-get">领取夺宝次数</a>
                    </div>
                    <a href="javascript:;" class="niudan-detail"></a>
                    <a href="javascript:;" class="niudan-prob"></a>
                    <a href="javascript:;" class="niudan-award"></a>
                    <div class="niudan_hole"><img src="" class="" alt=""></div>
                    <div class="niudan-container">
                        <{eval $i=1}>
                        <{foreach data=$prizeList item=item}>
                        <{if $item.p_group==1}>
                        <img class="qiu_<{$i++}>" data-prize="<{$item.p_pid}>" src="<{$item.f_p_other.img}>">
                        <{/if}>
                        <{/foreach}>
                        <img class="qiu_8" data-prize="0" src="<{file %cn%/4399cn/xxtjd/dts/release/images/niudan/5.png}>">
                    </div>
                    <div class="niudan-user user">
                        <{if $__ztCfg.zt_terminal.name == 'box'}>
                        <div class="user-log j-login-info" style="display: none">
                            <span class="user-greet">您好，</span>
                            <span class="user-name j-username" title=""></span>
                        </div>
                        <div class="user-ulog j-unlogin-info">
                            <a href="javascript:;" class="user-login j-login-btn">【登录】</a>
                        </div>
                        <{elseif $__ztCfg.zt_terminal.name == 'youpai'}>
                        <div class="user-log j-login-info" style="display: none">
                            <span class="user-greet">您好，</span>
                            <span class="user-name j-username" title=""></span>
                        </div>
                        <div class="user-ulog j-unlogin-info">
                            <a href="javascript:;" class="user-login j-login-btn">【登录】</a>
                        </div>
                        <{else}>
                            <{if $GUid > 0 }>
                            <div class="user-log">
                                <span class="user-greet">您好，</span>
                                <span class="user-name j-username" title="<{$$GNickName}>"><{$$GNickName}> </span>
                                <a href="javascript:;" class="user-logout j-logout-btn">【退出】</a>
                            </div>
                            <{else}>
                            <div class="user-ulog">
                                <a href="javascript:;" class="user-login j-login-btn">【登录】</a>
                                <!--<a href="javascript:;" class="user-reg">【注册】</a>-->
                            </div>
                            <{/if}>
                        <{/if}>
                    </div>
                    <a href="javascript:;" class="niudan-myaward"></a>
                    <a href="javascript:;" class="niudan-start" data-times="1">(剩余夺宝次数<span class="j-lotte-remain">0</span>)</a>
                </div>
                <div class="zbfl-txt mod-txt">
                    <div class="txt-hd"></div>
                    <div class="txt-bd">
                        <div class="txt-tit">夺宝<span>说明</span></div>
                        <div class="txt-cont">
                            <p>1.赛事直播期间，每观看5分钟直播可获得一次夺宝机会，领取夺宝次数之后重新计时，<span>每天最多获得3次机会；</span></p>
                            <p>2.夺宝次数当日使用有效，非直播期间夺宝暂不开启。</p>
                        </div>
                    </div>
                    <div class="txt-fd"></div>
                </div>
                <{if $__ztCfg.zt_terminal.name !== 'pc'}>
                <div class="zbfl-txt mod-txt">
                    <div class="txt-hd"></div>
                    <div class="txt-bd">
                        <div class="txt-tit">分享赢<span>次数</span></div>
                        <div class="txt-cont">
                            <p>1.直播期间分享直播可额外获得1次夺宝次数（每日1次）</p>
                        </div>
                        <a href="javascript:;" class="zbfl-share j-share"></a>
                    </div>
                    <div class="txt-fd"></div>
                </div>
                <{/if}>
                <div class="zbfl-txt mod-txt">
                    <div class="txt-hd"></div>
                    <div class="txt-bd">
                        <div class="txt-tit">奖励领<span>取说明</span></div>
                        <div class="txt-cont">
                            <p>1.获得实物奖励，请放心填写收件地址，礼品将在赛事结束后15个工作日内邮寄；</p>
                            <p>2.获得礼包激活码，可直接将激活码在游戏内兑换；</p>
                            <p>3.获得积分，可使用对应点数积分在专题页下方换取积分礼包激活码，激活码在游戏内兑换；</p>
                        </div>
                    </div>
                    <div class="txt-fd"></div>
                </div>
            </div>
        </div>
        <div class="mod mod--ssjl">
            <div class="mod-hd">
                <h2 class="mod-tit">赛事<span>奖励</span><i class="mod-bullet-l"></i></h2>
            </div>
            <div class="mod-bd">
                <ul class="ssjl-list">
                    <{foreach data=$ssjl item=item}>
                    <a href="javascript:;" class="ssjl-item">
                        <p class="item-rank"><{$item.title}></p>
                        <img class="item-image" src="<{$item.img}>" alt="<{$item.tit}>">
                        <p class="item-more" data-detail="<{$item.detail}>">查看详情</p>
                    </a>
                    <{/foreach}>

                </ul>
            </div>
        </div>
        <div class="mod mod--lbdh">
            <div class="mod-hd">
                <h2 class="mod-tit">礼包<span>兑换</span><i class="mod-bullet-r"></i></h2>
                <div class="mod-stit">剩余积分：<span class="j-integral">1000</span></div>
            </div>
            <div class="mod-bd">
                <ul class="lbdh-list">
                </ul>
            </div>
        </div>

    </div>
    </div>
    <div class="footer">本活动最终解释权归赛事举办方所有</div>
</div>
<{template dts/template}>
<script>
    var CONFIG = {
        actstatus:"3"/*"<{$ztStatus.status}>"*/,
        acttit:"<{$ztStatus.msg}>",

        jcstatus: "<{$jcStatus.status}>",
        jctit : "<{$jcStatus.msg}>",

        UNLOGIN:-1,
        /*活动状态码*/
        START: 3,                                    /*进行中*/
        NOTSTART: -5,                                /*未开启*/
        GAMEOVER: -6                                /*已结束*/
    };
    var appInfo = {
        environment : "<{$__ztCfg.zt_terminal.name}>",
        environmentMode : "<{if $__ztCfg.zt_dev}>DEV<{else}>PRO<{/if}>",
        checkIphone : "<{$__ztCfg.zt_terminal.checkIphone}>",
        mobiLoginUrl : "<{$mobiLoginUrl}>",

        BOX : 'box',
        YOUPAI : 'youpai',
        WAP : 'pc',
        PRO : 'PRO',
        IOS : "ios",
        ANDROID : "android",

        zbId : null,


        "id": "<{$tplCfg.pkg.id}>",
        "packag": "<{$tplCfg.pkg.pkgname}>",
        "appname": "<{$tplCfg.pkg.appname}>",
        "downurl": "<{$tplCfg.pkg.downurl}>",
        "icopath": "<{$tplCfg.pkg.icopath}>",
        "md5_file": "<{$tplCfg.pkg.md5}>",

        "downloadUrlForIos" : '<{$tplCfg.ymnr.urlIos}>',
        "downloadUrlForAdroid" : '<{$tplCfg.ymnr.urlAz}>'
    };
    var userInfo = {
        scookie : "",
        uid : "<{$GUid}>",
        nick : "",
        avatar : "",
        level : "",

        integral : "0",
        isShare : true
    };
    var pageInfo = {
        data : null,
        LIVE : 1,
        NO_LIVE : -6,
        PLAY_BACK : -5
    };
    var shareInfo = {
        img: "<{$tplCfg.ymnr.shareImg}>",/*分享的图片*/
        url: document.location.href,/*分享的地址*/
        title: "<{$tplCfg.ymnr.shareTitle}>",/*分享的标题*/
        desc: "<{$tplCfg.ymnr.shareDesc}>"/*分享信息描述，给朋友时需要*/
    };
    var LOTTERY = {
        statusZb : "<{$zbStatus.status}>",
        msgZb : "<{$zbStatus.msg}>",
        statusLotte : '3',/*活动状态*/
        availableLotteryNum : '<{$userData.lastTimes}>'/*剩余抽奖次*/,

        AWARD: 1,
        UNAWARD: 0,
        NOCHANCE: -2

    };
    var AWARD = {
        GIFT : 1,/*礼包*/
        UNNEED_UINFO : 2,/*不要用户信息的奖品 如游币 积分 单个武器*/
        NEED_UINFO : 3,/*需要用户填写信息的奖品 如实物*/
        COLLECTIONS : 4,/*奖品集合 如武器集合、礼包集合*/

        NOAWARD_DATA : -2
    };
</script>
<{js %cn%/lib/jquery.min.1.7.2.js group=2 fixed=1}>
<{if $__ztCfg.zt_terminal.name == 'pc'}>
    <{js %cn%/lib/clipboard.min.js group=3 fixed=1}>
<{/if}>
<{js %cn%/lib/baiduTemplate.js group=4}>
<{js %cn%/lib/ks.pager.js group=4}>
<{js %cn%/lib/ks.dialog.js group=4 fixed=1}>
<{eval $mode='release'}>
<{if $mode=='dev'}>
    <{js %cn%/lib/mock-min.js group=5 fixed=1}>
    <{js %cn%/lib/mock.js group=5}>
    <{js %cn%/lib/vconsole.min.js group=5}>
    <{if $__ztCfg.zt_terminal.name == 'box'}>
        <{js %cn%/lib/gameBox.share.js group=6 fixed=1}>
    <{/if}>
    <{js %cn%/4399cn/xxtjd/dts/dev/js/bundle.js group=7 fixed=1}>
<{else}>
    <{if $__ztCfg.zt_terminal.name == 'box'}>
        <{js %cn%/lib/gameBox.share.js group=8 fixed=1}>
    <{/if}>
    <{js %cn%/4399cn/xxtjd/dts/release/js/bundle.js group=9 fixed=1}>
<{/if}>
<{template file=_footer dir=cn}>
