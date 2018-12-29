// window.onerror = function (message, url, line, column, error) {
//     console.log('log---onerror::::',message, url, line, column, error);
// }

/**
 * Created by Adrian on 2018/5/25.
 */
var Util = {
    isArray : function(o){return Object.prototype.toString.call(o) === '[object Array]';},
    isObject : function(o){return Object.prototype.toString.call(o) === '[object Object]';},
    getCookie : function (name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)) return unescape(arr[2]);
        else return null;
    },
    delCookie : function (name,domain) {
        var exp = new Date();
        var domain 
        exp.setTime(exp.getTime() - 10000);
        document.cookie = name + "=''; expires=" + exp.toGMTString()+"; path=/;domain=" + domain + ";";
    },
    getScrollTop : function(){
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        return scrollTop;
    },
    setScrollTop : function(scrollTop) {
        document.documentElement.scrollTop = scrollTop;
        window.pageYOffset = scrollTop;
        document.body.scrollTop = scrollTop;
    },
    scrollTop : function(el, targetY, duration) {
        let _duration = duration?duration:1;
        //计算需要移动的距离
        let needScrollTop = targetY - this.getScrollTop();
        let _currentX = this.getScrollTop(), $this = this;
        setTimeout(function () {
          //一次调用滑动帧数，每次调用会不一样
          const dist = Math.ceil(needScrollTop / 10);
          _currentX += dist;
          $this.setScrollTop(_currentX);
          //如果移动幅度小雨十个像素，直接移动，否则递归
          if (needScrollTop > 10 || needScrollTop < -10){
            $this.scrollTop(el, targetY, _duration);
          }
          else {
            $this.setScrollTop(_currentX);
          }

        }, _duration)
      }
};


/**
 * ClientBox
 *  */
var ClientBox = {
    init : function(){
        userInfo.scookie = unescape(window.login.onLoadCookieForJs());
    },
    login: function() {
        console.log(userInfo.scookie);
        if (!userInfo.scookie) {
            if(window.login) {
                window.login.onJSIvoke();
            }
        }
    },
    copy: function copy(str) {
        if(window.android) {
            window.android.onCopyToClipboard(str,"已复制到剪切板");
        }else {
            alert('当前版本不支持复制文本，请升级至最新版');
        }
    },
    shareCustom : function (param,btn,complete,openShare,isGetData) {
        // alert(JSON.stringify(param));
        var boxShare = new window.gameBox.share({
            all : btn,
            config : {
                "shareTitle": param.shareTitle,
                "shareIcon": param.shareIcon,
                "shareUrl": param.shareUrl,
                "shareContent": param.shareContent
            },
            complete : complete || function(e){}
        });
        return boxShare;
    }
};


/**
 * ClientYoupai
 *  */
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
                alert("已复制到剪切板");
            }else{
                alert(msg);
            }
        };
        document.location.href = "protocol://setClipboard?content=" + encodeURI(str);
    },
    shareCustom : function (param) {
        var str = "";
        for(key in param){
            param[key] =  encodeURIComponent(param[key]);
            str += "&" + key + "=" + param[key];
        }
        document.location.href = "protocol://toCustomShare?" + str.substr(1);
    }
};


/**
 * Webgame
 *  */
window.callbackLogin = function(){
    console.log("登录后回调");
};
window.callbackUnlogin = function(){
    console.log("未登录回调，不包含登录弹窗的调用业务");
};
window._afterLoginCallback =function () {
    console.log("用户uid：",userInfo.uid);
};

var Webgame = window.Webgame || {};

Webgame.isLogin = function (){
    return userLoginCfg.isLogin;
};
Webgame.checkLogin = function(e,callbackLogin, callbackUnlogin){
    topbarComponent.checkLogin(e,callbackLogin, callbackUnlogin);
    return false;
};
Webgame.logout = function(){
    cnLogin.logout();
    return false;
};


/**
 * Mobile
 *  */
var Wap = {
    _copy : {},
    init : function(){

    },
    login : function(){
        if(!this.isLogin()){
            window.location.href = ztInfo.mobiLoginUrl;
            return false;
        }
    },
    logout : function(){
        if(this.isLogin()){
            var _domain = ztInfo.environment === CONFIG.DEV ? "apps.4399.com" : ".www.4399youpai.com";
            var _name = "mobi_user_code8d8";
            var _mobi_user_code8d8 = Util.getCookie(_name);
            Util.delCookie(_name,_domain);
            Util.delCookie(_mobi_user_code8d8,_domain);
            location.reload();
        }
    },
    isLogin : function (){
        if(userInfo.uid && userInfo.uid > 0){
            return true;
        }else{}
        return false;
    },
    copy : function(btn){
        if(!this._copy[btn]){
            this._copy[btn] = new ClipboardJS(btn);
            this._copy[btn].on('success', function(e) {
                alert("已复制到剪切板");
                /*console.info('Action:', e.action);
                    console.info('Text:', e.text);
                    console.info('Trigger:', e.trigger);*/
                e.clearSelection();
            });
            this._copy[btn].on('error', function(e) {
                alert("请手动复制礼包码");
                /*console.error('Action:', e.action);
                    console.error('Trigger:', e.trigger);*/
            });
        }
    }
};





