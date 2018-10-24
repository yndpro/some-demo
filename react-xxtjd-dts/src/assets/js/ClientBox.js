

var ClientBox = {
    env: {platform: 'android', 'version': '', 'isClient': 1},
    init : function(){
        var client = this;
        var isAndroid = (/android/gi).test(navigator.appVersion),
            isClient = (/4399GameCenter/gi).test(navigator.userAgent),
            isIDevice = (/iphone|ipad|ipod/gi).test(navigator.appVersion);
        client.env.platform = isAndroid ? 'android' : (isIDevice ? 'ios' : 'unknow');
        client.env.isClient = isClient;
        if(/(4399GameCenter\/)(\d+\.\d+\.\d+(\.\d+)?)/g.test(navigator.userAgent)) {
            client.env.version = RegExp.$2;
        }
        userInfo.scookie = unescape(window.login.onLoadCookieForJs());
    },
    login: function() {
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
            PopupView.tip('当前版本不支持复制文本，请升级至最新版');
        }
    },
    shareCustom : function (param,btn,complete,openShare,isGetData) {
        var boxShare = new gameBox.share({
            target : "",
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
    },
    download : function (options) {
        var boxDownload;
        if(typeof require === 'function'){
            boxDownload = require("./mBoxDownload.js");
        } else {
            boxDownload = window.boxDownload;
        }
        boxDownload(options);
    },
    checkVersion: function(v1, v2, operator) {
        this.php_js = this.php_js || {};
        this.php_js.ENV = this.php_js.ENV || {};
        var i = 0,
            x = 0,
            compare = 0,
            vm = {
                'dev': -6,
                'alpha': -5,
                'a': -5,
                'beta': -4,
                'b': -4,
                'RC': -3,
                'rc': -3,
                '#': -2,
                'p': 1,
                'pl': 1
            },
            prepVersion = function(v) {
                v = ('' + v)
                    .replace(/[_\-+]/g, '.');
                v = v.replace(/([^.\d]+)/g, '.$1.')
                    .replace(/\.{2,}/g, '.');
                return (!v.length ? [-8] : v.split('.'));
            };
        var numVersion = function(v) {
            return !v ? 0 : (isNaN(v) ? vm[v] || -7 : parseInt(v, 10));
        };
        v1 = prepVersion(v1);
        v2 = prepVersion(v2);
        x = Math.max(v1.length, v2.length);
        for(i = 0; i < x; i++) {
            if(v1[i] == v2[i]) {
                continue;
            }
            v1[i] = numVersion(v1[i]);
            v2[i] = numVersion(v2[i]);
            if(v1[i] < v2[i]) {
                compare = -1;
                break;
            }else if(v1[i] > v2[i]) {
                compare = 1;
                break;
            }
        }
        if(!operator) {
            return compare;
        }
        switch(operator) {
            case '>':
            case 'gt':
                return (compare > 0);
            case '>=':
            case 'ge':
                return (compare >= 0);
            case '<=':
            case 'le':
                return (compare <= 0);
            case '==':
            case '=':
            case 'eq':
                return (compare === 0);
            case '<>':
            case '!=':
            case 'ne':
                return (compare !== 0);
            case '':
            case '<':
            case 'lt':
                return (compare < 0);
            default:
                return null;
        }
    }
};


    