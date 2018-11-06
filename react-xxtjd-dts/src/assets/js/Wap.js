
import ClipboardJS from 'clipboard';
import {PopupView} from '../../components/PopView';

if(ztInfo.environmentMode == CONFIG.PRO){
    window.mobileLogin = {
        login: function () {
            window.location.href = ztInfo.mobiLoginUrl;
        },
        logout:function (url) {
            var ck_mobi_user = "mobi_user_code8d8";
            var mobi_user_code = Util.getCookie(ck_mobi_user);
            Util.delCookie(mobi_user_code);
            Util.delCookie(ck_mobi_user);
            window.location.href = window.location.href;
        }
    };
}else {
    window.mobileLogin = {
        login: function (url) {
            this.go('login', url);
        },
        register: function (url) {
            this.go('register', url);
        },
        go: function (action, url) {
            url = url ? url : window.location.href;
            action = (action == 'register') ? 'REGISTER' : 'LOGIN';
            window.location.href = "https://ptlogin.4399.com/oauth2/authorize.do?client_id=test&response_type=NILL&auth_action="
                + action + "&redirect_uri=" + url;
        },
        logout: function (url) {
            url = url ? url : window.location.href;
            window.location.href = 'http://ptlogin.4399.com/ptlogin/logout.do?url=' + url;
        }
    };
}


var Wap = {
    go: function (action, url) {
        url = url ? url : window.location.href;
        action = (action == 'register') ? 'REGISTER' : 'LOGIN';
        window.location.href = "https://ptlogin.4399.com/oauth2/authorize.do?client_id=test&response_type=NILL&auth_action="
            + action + "&redirect_uri=" + url;
    },
    register: function (url) {
        this.go('register', url);
    },
    login : function(){
        if(!this.isLogin()){
            mobileLogin.login('');return false;
        }
    },
    logout : function(){
        if(this.isLogin()){
            mobileLogin.logout('');return false;
        }
    },
    isLogin : function (){
        if(userInfo.uid && userInfo.uid > 0){
            return true;
        }else{}
        return false;
    },
    copy : function(btn){
        if(navigator.userAgent.indexOf('UCBrowser') > -1) {
            $(btn).bind('click',function () {
                PopupView.tip("请手动复制啦~");
            })
        }else{
            var _copy = new ClipboardJS(btn);
            console.log(_copy);
            _copy.on('success', function(e) {
                PopupView.tip("已复制到剪切板");
                /*console.info('Action:', e.action);
                    console.info('Text:', e.text);
                    console.info('Trigger:', e.trigger);*/
                e.clearSelection();
            });
            _copy.on('error', function(e) {
                PopupView.tip("请手动复制啦~");
                /*console.error('Action:', e.action);
                    console.error('Trigger:', e.trigger);*/
            });
        }
    }
};

window.Wap = Wap
    