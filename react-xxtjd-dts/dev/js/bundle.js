(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (factory) {
    // CMD/SeaJS
    if (typeof define === "function") {
        define(["./m_dialog.js", "./Ajax.js"], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
        factory(require, exports, module);
    }
    // No module loader
    else {
            factory('', window = window || {}, '');
        }
})(function (require, exports, module) {

    var Ajax = {
        get: function get(url, data, callback, options) {
            options = $.extend({
                async: true,
                dataType: 'json'
            }, options || {});
            if (userInfo.scookie) {
                if (typeof data === "string") {
                    data = data + "&scookie=" + userInfo.scookie;
                } else {
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
                success: function success(result) {
                    if (typeof callback == 'function') {
                        callback(result);
                    }
                }
            });
        },
        post: function post(url, data, callback, options) {
            options = $.extend({
                async: true,
                dataType: 'json'
            }, options || {});
            if (userInfo.scookie) {
                if (typeof data === "string") {
                    data = data + "&scookie=" + userInfo.scookie;
                } else {
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
                success: function success(result) {
                    if (typeof callback == 'function') {
                        callback(result);
                    }
                }
            });
        }
    };

    if ({}.toString.call(module) == '[object Object]') {
        module.exports = Ajax;
    } else {
        exports.Ajax = Ajax;
    }
});

},{}],2:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (factory) {
    // CMD/SeaJS
    if (typeof define === "function") {
        define(["./m_dialog.js"], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
        factory(require, exports, module);
    }
    // No module loader
    else {
            factory('', window = window || {}, '');
        }
})(function (require, exports, module) {

    var PopupView;

    if (typeof require === 'function') {
        PopupView = require("./m_dialog.js");
    } else {
        PopupView = window.PopupView;
    }

    var ClientBox = {
        env: { platform: 'android', 'version': '', 'isClient': 1 },
        init: function init() {
            var client = this;
            var isAndroid = /android/gi.test(navigator.appVersion),
                isClient = /4399GameCenter/gi.test(navigator.userAgent),
                isIDevice = /iphone|ipad|ipod/gi.test(navigator.appVersion);
            client.env.platform = isAndroid ? 'android' : isIDevice ? 'ios' : 'unknow';
            client.env.isClient = isClient;
            if (/(4399GameCenter\/)(\d+\.\d+\.\d+(\.\d+)?)/g.test(navigator.userAgent)) {
                client.env.version = RegExp.$2;
            }
            userInfo.scookie = unescape(window.login.onLoadCookieForJs());
        },
        login: function login() {
            if (!userInfo.scookie) {
                if (window.login) {
                    window.login.onJSIvoke();
                }
            }
        },
        copy: function copy(str) {
            if (window.android) {
                window.android.onCopyToClipboard(str, "已复制到剪切板");
            } else {
                PopupView.tip('当前版本不支持复制文本，请升级至最新版');
            }
        },
        shareCustom: function shareCustom(param, btn, complete, openShare, isGetData) {
            var boxShare = new gameBox.share({
                target: "",
                all: btn,
                config: {
                    "shareTitle": param.shareTitle,
                    "shareIcon": param.shareIcon,
                    "shareUrl": param.shareUrl,
                    "shareContent": param.shareContent
                },
                complete: complete || function (e) {}
            });
            return boxShare;
        },
        download: function download(options) {
            var boxDownload;
            if (typeof require === 'function') {
                boxDownload = require("./mBoxDownload.js");
            } else {
                boxDownload = window.boxDownload;
            }
            boxDownload(options);
        },
        checkVersion: function checkVersion(v1, v2, operator) {
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
                prepVersion = function prepVersion(v) {
                v = ('' + v).replace(/[_\-+]/g, '.');
                v = v.replace(/([^.\d]+)/g, '.$1.').replace(/\.{2,}/g, '.');
                return !v.length ? [-8] : v.split('.');
            };
            var numVersion = function numVersion(v) {
                return !v ? 0 : isNaN(v) ? vm[v] || -7 : parseInt(v, 10);
            };
            v1 = prepVersion(v1);
            v2 = prepVersion(v2);
            x = Math.max(v1.length, v2.length);
            for (i = 0; i < x; i++) {
                if (v1[i] == v2[i]) {
                    continue;
                }
                v1[i] = numVersion(v1[i]);
                v2[i] = numVersion(v2[i]);
                if (v1[i] < v2[i]) {
                    compare = -1;
                    break;
                } else if (v1[i] > v2[i]) {
                    compare = 1;
                    break;
                }
            }
            if (!operator) {
                return compare;
            }
            switch (operator) {
                case '>':
                case 'gt':
                    return compare > 0;
                case '>=':
                case 'ge':
                    return compare >= 0;
                case '<=':
                case 'le':
                    return compare <= 0;
                case '==':
                case '=':
                case 'eq':
                    return compare === 0;
                case '<>':
                case '!=':
                case 'ne':
                    return compare !== 0;
                case '':
                case '<':
                case 'lt':
                    return compare < 0;
                default:
                    return null;
            }
        }
    };

    if ({}.toString.call(module) == '[object Object]') {
        module.exports = ClientBox;
    } else {
        exports.ClientBox = ClientBox;
    }
});

},{"./mBoxDownload.js":6,"./m_dialog.js":8}],3:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (factory) {
    // CMD/SeaJS
    if (typeof define === "function") {
        define(["./m_dialog.js"], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
        factory(require, exports, module);
    }
    // No module loader
    else {
            factory('', window = window || {}, '');
        }
})(function (require, exports, module) {

    var PopupView;

    if (typeof require === 'function') {
        PopupView = require("./m_dialog.js");
    } else {
        PopupView = window.PopupView;
    }

    var ClientYoupai = {
        init: function init(callback) {
            window.setLoginInfo = function (token, authCode, uid, nick, avatar, level) {
                var _arr = Array.prototype.slice.call(arguments);
                if (_arr[0] == "") {
                    userInfo.scookie = "";
                } else {
                    userInfo.scookie = _arr.join("|");
                }
                typeof callback == "function" && callback();
            };
            document.location.href = "protocol://setLoginInfo";
        },
        login: function login() {
            if (!userInfo.scookie) {
                document.location.href = "protocol://toLogin";return false;
            }
        },
        copy: function copy(str) {
            window.setClipboard = function (isSuccess, msg) {
                if (isSuccess) {
                    PopupView.tip("已复制到剪切板");
                } else {
                    PopupView.tip(msg);
                }
            };
            document.location.href = "protocol://setClipboard?content=" + encodeURI(str);
        },
        shareCustom: function shareCustom(param) {
            var str = "";
            for (var key in param) {
                /*if(key == "iconUrl" || key == "redirectUrl"){*/
                param[key] = encodeURI(param[key]);
                /*}*/
                str += "&" + key + "=" + param[key];
            }
            document.location.href = "protocol://toCustomShare?" + str.substr(1);
        }
    };

    if ({}.toString.call(module) == '[object Object]') {
        module.exports = ClientYoupai;
    } else {
        exports.ClientYoupai = ClientYoupai;
    }
});

},{"./m_dialog.js":8}],4:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function (factory) {
    // CMD/SeaJS
    if (typeof define === "function") {
        define(["./m_dialog.js"], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
        factory(require, exports, module);
    }
    // No module loader
    else {
            factory('', window = window || {}, '');
        }
})(function (require, exports, module) {

    var PopupView;

    if (typeof require === 'function') {
        PopupView = require("./m_dialog.js");
    } else {
        PopupView = window.PopupView;
    }

    var Util = {
        isArray: function isArray(o) {
            return Object.prototype.toString.call(o) === '[object Array]';
        },
        isObject: function isObject(o) {
            return Object.prototype.toString.call(o) === '[object Object]';
        },
        getCookie: function getCookie(name) {
            var arr,
                reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
        },
        delCookie: function delCookie(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            document.cookie = name + "=''; expires=" + exp.toGMTString() + "; path=/;domain=4399.cn;";
        }
    };

    if (appInfo.environmentMode == appInfo.PRO) {
        window.mobileLogin = {
            login: function login() {
                window.location.href = appInfo.mobiLoginUrl;
            },
            logout: function logout(url) {
                var ck_mobi_user = "mobi_user_code8d8";
                var mobi_user_code = Util.getCookie(ck_mobi_user);
                Util.delCookie(mobi_user_code);
                Util.delCookie(ck_mobi_user);
                window.location.href = window.location.href;
            }
        };
    } else {
        window.mobileLogin = {
            login: function login(url) {
                this.go('login', url);
            },
            register: function register(url) {
                this.go('register', url);
            },
            go: function go(action, url) {
                url = url ? url : window.location.href;
                action = action == 'register' ? 'REGISTER' : 'LOGIN';
                window.location.href = "https://ptlogin.4399.com/oauth2/authorize.do?client_id=test&response_type=NILL&auth_action=" + action + "&redirect_uri=" + url;
            },
            logout: function logout(url) {
                url = url ? url : window.location.href;
                window.location.href = 'http://ptlogin.4399.com/ptlogin/logout.do?url=' + url;
            }
        };
    }

    var Wap = {
        go: function go(action, url) {
            url = url ? url : window.location.href;
            action = action == 'register' ? 'REGISTER' : 'LOGIN';
            window.location.href = "https://ptlogin.4399.com/oauth2/authorize.do?client_id=test&response_type=NILL&auth_action=" + action + "&redirect_uri=" + url;
        },
        register: function register(url) {
            this.go('register', url);
        },
        login: function login() {
            if (!this.isLogin()) {
                mobileLogin.login('');return false;
            }
        },
        logout: function logout() {
            if (this.isLogin()) {
                mobileLogin.logout('');return false;
            }
        },
        isLogin: function isLogin() {
            if (userInfo.uid && userInfo.uid > 0) {
                return true;
            } else {}
            return false;
        },
        copy: function copy(btn) {
            if (navigator.userAgent.indexOf('UCBrowser') > -1) {
                $(btn).bind('click', function () {
                    PopupView.tip("请手动复制啦~");
                });
            } else {
                var _copy = new ClipboardJS(btn);
                _copy.on('success', function (e) {
                    PopupView.tip("已复制到剪切板");
                    /*console.info('Action:', e.action);
                     console.info('Text:', e.text);
                     console.info('Trigger:', e.trigger);*/
                    e.clearSelection();
                });
                _copy.on('error', function (e) {
                    PopupView.tip("请手动复制啦~");
                    /*console.error('Action:', e.action);
                     console.error('Trigger:', e.trigger);*/
                });
            }
        }
    };

    if ({}.toString.call(module) == '[object Object]') {
        module.exports = Wap;
    } else {
        exports.Wap = Wap;
    }
});

},{"./m_dialog.js":8}],5:[function(require,module,exports){
"use strict";

var PopupView = require("./m_dialog.js");
var MyAward = require("./m_myaward.js");
var Lottery = require("./m_lottery.js");
var Ajax = require("./Ajax.js");
var ClientBox = require("./ClientBox.js");
var ClientYoupai = require("./ClientYoupai.js");
var Wap = require("./Wap.js");
var Gift = require("./m_gift.js");
var CountDown = require("./m_countdown.js");

var page = {

    /**
     * init*/
    init: function init() {
        var _this2 = this;

        window.pauseVideo = function () {
            var video = document.getElementById("video");
            if (video) {
                video.pause();
            }
        };

        if (appInfo.environment == appInfo.BOX) {
            ClientBox.init();
            if (ClientBox.checkVersion(this.getAndroidVersion(), '4.5', '<=')) {
                $('.view').addClass('lowVersion');
            }
            this.getInitInfo();
        }
        if (appInfo.environment == appInfo.YOUPAI) {
            if (ClientBox.checkVersion(this.getAndroidVersion(), '4.5', '<=')) {
                $('.view').addClass('lowVersion');
            }
            ClientYoupai.init(function () {
                _this2.getInitInfo();
            });
        }
        if (appInfo.environment == appInfo.WAP) {
            this.getInitInfo();
        }

        /**
         * acti*/
        if (CONFIG.acstatus == CONFIG.NOTSTART) {
            PopupView.tip(CONFIG.acttit);
        }

        if (CONFIG.acstatus == CONFIG.GAMEOVER) {
            PopupView.tip(CONFIG.acttit);
        }

        if (CONFIG.acstatus == CONFIG.START) {
            Vision.init({});
        }

        this.download({ btn: '.j-download' });
        this.share({ btn: ".j-share" });
        this.bind();

        var optionsMyawardTemp = {
            myawardTmpl: '#myawardTmpl',
            loadingTmpl: '#loadingTmpl',
            dataTmpl: '#myawardDataTmpl',
            nodataTmpl: '#myawardNodataTmpl',
            bodyNode: '.dialog-body',
            listNode: '.myaward-list',
            itemTmpl: 'myawardItemTmpl'
        };

        var myAward = new MyAward($.extend({
            btn: '.niudan-myaward',
            urlGetMyPrizes: _zt._ztUrl + "-ajaxGetMyPrize",
            urlWriteUserInfo: _zt._ztUrl + "-ajaxWriteUserInfo"
        }, optionsMyawardTemp));
        var lottery = new Lottery({
            container: '.lotte',
            start_btn: '.niudan-start',
            multi_btn: '.j-lotte-start10',
            target: '.niudan-container',
            prize_list: '#j-lottery-panel li',
            lottery_count: ".j-lotte-remain",
            hLottery_count: '.j-hremain',
            urlWriteUserInfo: _zt._ztUrl + "-ajaxWriteUserInfo"
        });
        myAward.bind();
        lottery.bind();
        CountDown.bind();
    },

    getInitInfo: function getInitInfo() {
        var _this3 = this;

        Ajax.post(_zt._ztUrl + '-ajaxInitBx', { _AJAX_: 1 }, function (res) {
            var _res$data$pageInfo = res.data.pageInfo,
                score = _res$data$pageInfo.score,
                dhPrize = _res$data$pageInfo.dhPrize;


            _this3.user(res);
            Exchange.init({ list: dhPrize, integral: score });
            _this3.resolve(res);
        }, "json");
    },

    user: function user(res) {
        var _res$data = res.data,
            uid = _res$data.uid,
            nick = _res$data.nick,
            _res$data$pageInfo2 = _res$data.pageInfo,
            isShare = _res$data$pageInfo2.isShare,
            lastTimes = _res$data$pageInfo2.lastTimes,
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

    getData: function getData() {
        var _this4 = this;

        Ajax.post(_zt._ztUrl + "-ajaxGetZbList", { _AJAX_: 1 }, function (res) {

            _this4.resolve(res);
        }, 'json');
    },

    resolve: function resolve(res) {

        pageInfo.olddata = pageInfo.data;
        pageInfo.data = res.data;

        var _pageInfo$data = pageInfo.data,
            zbStatus = _pageInfo$data.zbStatus,
            zbList = _pageInfo$data.zbList;


        Vision.render({ zbList: zbList, zbStatus: zbStatus });
        CountDown.update();

        if (CONFIG.actstatus > 0) {
            var minite = zbStatus.freshBlank;
            if (minite && minite >= 1) {
                setTimeout(this.getData.bind(this), minite * 60 * 1000);
            }
        }
    },

    /**
     * event*/
    bind: function bind() {
        var $body = $('body');

        $body.on('click', '.j-login-btn', function () {
            if (appInfo.environment == appInfo.WAP) {
                Wap.login();
            }
            if (appInfo.environment == appInfo.BOX) {
                ClientBox.login();
            }
            if (appInfo.environment == appInfo.YOUPAI) {
                ClientYoupai.login();
            }
        });
        $body.on('click', '.j-logout-btn', function () {
            if (appInfo.environment == appInfo.WAP) {
                Wap.logout();
            }
        });
        $body.on('click', '.ssjl-item,.lbdh-item .item-cover', function () {
            var _detail = $(this).find(".item-more").attr("data-detail");
            if (_detail) PopupView.awardList({ list: _detail.split("|") });
        });
        $body.on('click', '.j-goto-live', function () {
            if (appInfo.zbId) document.location.href = "protocol://toMobileLive?id=" + appInfo.zbId;
            return false;
        });
        $body.on('click', '.niudan-prob', function () {
            PopupView.prob();
        });
        $body.on('click', '.niudan-award', function () {
            PopupView.award();
        });
    },
    /**
     * 下载
     */
    download: function download(options) {
        var $body = $('body');
        if (appInfo.environment == appInfo.WAP) {
            $body.on('click', options.btn, function () {
                window.location.href = appInfo.checkIphone == "1" ? appInfo.downloadUrlForIos : appInfo.downloadUrlForAdroid;
            });
        }
        if (appInfo.environment == appInfo.BOX) {
            ClientBox.download({ btn: options.btn });
        }
        if (appInfo.environment == appInfo.YOUPAI) {
            $(options.btn).hide();
        }
    },
    /**
     * 分享
     */
    share: function share(options) {
        var $body = $('body');

        var postShare = function postShare() {
            if (!userInfo.isShare) {
                Ajax.post(_zt._ztUrl + '-ajaxShare', { _AJAX_: 1 }, function (result) {
                    var status = result.status,
                        lastTimes = result.data.lastTimes,
                        msg = result.msg;

                    if (status == 1) {
                        LOTTERY.availableLotteryNum = lastTimes;
                        $(".j-lotte-remain").html(LOTTERY.availableLotteryNum);
                    }
                });
            }
        };

        if (appInfo.environment == appInfo.YOUPAI) {
            $body.on('click', options.btn, function (e) {
                if (!userInfo.uid || userInfo.uid == 0) {
                    ClientYoupai.login();
                    return false;
                }
                ClientYoupai.shareCustom({
                    "title": shareInfo.title,
                    "content": shareInfo.desc,
                    "iconUrl": shareInfo.img,
                    "redirectUrl": shareInfo.url
                });
                postShare();
                return false;
            });
        }
        if (appInfo.environment == appInfo.BOX) {

            var shareCallback = function shareCallback(param) {
                if (param.shareResult == 1) {
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
            }, options.btn, shareCallback);
        }
    },

    getAndroidVersion: function getAndroidVersion() {
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

    $integral: $('.j-integral'),
    $body: $('body'),
    $list: $('.lbdh-list'),

    init: function init(_ref) {
        var list = _ref.list,
            integral = _ref.integral;


        userInfo.integral = integral;
        this.$integral.html(integral);
        if (list) this.$list.html(baidu.template('exchangeListTmpl', { list: list }));

        var ExchangeGift = this.getExchangeGift();

        this.getInstance(ExchangeGift, {
            'btn': '.j-dh-get'
        });
    },

    getExchangeGift: function getExchangeGift() {
        var _this = this;

        function ExchangeGift(options) {
            Gift.call(this, options);
        }
        ExchangeGift.prototype = new Gift();
        ExchangeGift.prototype.constructor = ExchangeGift;
        ExchangeGift.prototype.handle = function () {
            var ctx = this,
                code = ctx.$target.attr('data-code'),
                name = ctx.$target.attr('data-name');

            ctx.point = parseInt(ctx.$target.attr("data-point"));

            if (!userInfo.uid || userInfo.uid == 0) {
                ctx.resolve({ status: CONFIG.UNLOGIN });
                return false;
            }

            if (!ctx.resolve({ status: CONFIG.actstatus })) {
                return false;
            }

            if (code) {
                ctx.resolve({ status: 2, data: { prizeName: name, code: code } });
                return false;
            }

            if (userInfo.integral < ctx.point) {
                PopupView.confirm({
                    'title': '您的积分不足，无法兑换该礼包',
                    'text': '（您可在赛事直播期间，进行夺宝抽奖获得礼包兑换积分！）',
                    'btnList': ['confirm']
                });
                return false;
            }

            PopupView.confirm({
                'title': '该礼包需要消耗' + ctx.point + '积分进行兑换',
                'btnList': ['confirm', 'cancel']
            }, function () {
                $('.j-confirm').unbind('click').bind('click', function () {
                    ctx.getPrize();
                });
            });
        };
        ExchangeGift.prototype.setState = function (data) {
            var ctx = this;

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

    getInstance: function getInstance(constructor, options) {
        return new constructor(options);
    }

};
/**
 * 视频/列表 模块
 */
var Vision = {

    data: null,
    $wrap: $('.sszb-wrap'),
    $scheduleList: $('.sclb-list'),

    formatDate: function formatDate(time) {
        var str1 = time.replace("-", "月");
        return str1.replace(" ", "日 ");
    },

    render: function render(_ref2) {
        var zbList = _ref2.zbList,
            zbStatus = _ref2.zbStatus;

        var _this = this;
        var _html = "";

        this.dataOld = this.data;
        this.data = { zbList: zbList, zbStatus: zbStatus };

        if (zbStatus.zbId) {
            appInfo.zbId = zbStatus.zbId;
        }

        if (appInfo.environment == appInfo.YOUPAI && appInfo.zbId && !$(".j-goto-live").length) {
            this.$wrap.after("<a href=\"javascript:;\" class=\"sszb-goyoupai j-goto-live\"></a>");
        }

        if (zbList) {
            _this.$scheduleList.html(baidu.template('scheduleTmpl', { list: zbList }));
        }

        $('.mod--sszb .mod-tit').html(/^[\u4e00-\u9fa5]{2}/.exec(zbStatus.headTit) + "<span>" + /[\u4e00-\u9fa5]{2}$/.exec(zbStatus.headTit) + "</span><i class=\"mod-bullet-r\"></i>");

        if (zbStatus.status == pageInfo.LIVE) {
            /*当前是直播*/
            if (_this.dataOld && zbStatus.yp == pageInfo.olddata.zbStatus.yp) {
                return false;
            }
            _html = baidu.template('youpaiTmpl', zbStatus);
            _this.$wrap.html(_html);
        } else if (zbStatus.status == pageInfo.PLAY_BACK) {
            /*当前回放*/
            if (_this.dataOld && zbStatus.spUrl == _this.dataOld.zbStatus.spUrl) {
                return false;
            }
            _html = baidu.template('videoTmpl', zbStatus);
            _this.$wrap.html(_html);
        } else {
            _this.$wrap.html("<img width=\"100%\" height=\"100%\" alt=\"\" src=" + zbStatus.defImg + ">"); /*维护*/
        }
    }
};

$('body').ready(function () {
    /*_zt._ztUrl = "http://";*/
    page.init();
});

},{"./Ajax.js":1,"./ClientBox.js":2,"./ClientYoupai.js":3,"./Wap.js":4,"./m_countdown.js":7,"./m_dialog.js":8,"./m_gift.js":9,"./m_lottery.js":10,"./m_myaward.js":11}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
* 游戏盒下载游戏包模块
*
* */
;(function (factory) {
    // CMD/SeaJS
    if (typeof define === "function") {
        define([], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        factory(require, exports, module);
    }
    // No module loader
    else {
            factory('', window = window || {}, '');
        }
})(function (require, exports, module) {

    function boxDownload(options) {
        var downAppInfo = {
            downloadUrl: appInfo.downurl,
            packageName: appInfo.packag,
            appName: appInfo.appname,
            iconPath: appInfo.icopath,
            fileMD5: appInfo.md5_file
        };
        var downloadAPI = window.downloadAPI || window.android;

        var btn = options.btn || ".j-download";
        var stateTxt = options.stateTxt || ".j-down-state";
        var nbtn = document.querySelector(btn);
        var nStateTxt = document.querySelector(stateTxt);

        var _status = null;
        var handle = function handle() {};

        /*runing（下载中） 100,
         paused（暂停）101,
         pending（等待）102,
         success（下载成功） 103,
         unpackpping（未安装） 200,
         installed（已安装） 201,
         cancel（取消） 0,
         networkerror -100,
         更新 202*/

        var strategies = {
            status_200: function status_200() {
                nStateTxt.innerHTML = '解压数据包';
            },
            status_100: function status_100() {
                nbtn.innerHTML = '暂停下载';
                handle = function handle() {
                    downloadAPI.pauseDownload(appInfo.packag);
                };
            },
            status_101: function status_101() {
                nbtn.innerHTML = '继续下载';
                handle = function handle() {
                    downloadAPI.downloadApp(JSON.stringify(downAppInfo));
                };
            },
            status_102: function status_102() {
                nStateTxt.innerHTML = '等待';
            },
            status_103: function status_103() {
                nbtn.innerHTML = '安装游戏';
                handle = function handle() {
                    downloadAPI.installApp(appInfo.packag);
                };
            },
            status_201: function status_201() {
                nbtn.innerHTML = '开始游戏';
                handle = function handle() {
                    downloadAPI.launchApp(appInfo.packag);
                };
            },
            status_202: function status_202() {
                nbtn.innerHTML = '更新游戏';
                handle = function handle() {
                    downloadAPI.downloadApp(JSON.stringify(downAppInfo));
                };
            },
            status_0: function status_0() {
                nbtn.innerHTML = '游戏下载';
                handle = function handle() {
                    downloadAPI.downloadApp(JSON.stringify(downAppInfo));
                };
            }
        };

        window.updateApps = function (res) {
            var status = res[0].status;
            if (status == -100) {
                nStateTxt.innerHTML = '网络错误';
            }
            _status = status;
            strategies['status_' + status]();
        };

        window.updateApp = function (res) {
            var status = res.status;
            _status = status;
            strategies['status_' + status]();
        };
        downloadAPI.getAppStatus(appInfo.packag, 'updateApps');
        downloadAPI.bindEvent("download", "updateApp");

        nbtn.addEventListener('click', function () {
            handle();
        });
    }

    if ({}.toString.call(module) == '[object Object]') {
        module.exports = boxDownload;
    } else {
        exports.boxDownload = boxDownload;
    }
});

},{}],7:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by 4399-1068 on 2017/4/7.
 * 抽奖模块
 */
;(function (factory) {
    // CMD/SeaJS
    if (typeof define === "function") {
        define(["./m_dialog.js", "./Ajax.js", "./ClientBox.js", "./ClientYoupai.js", "./Wap.js"], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
        factory(require, exports, module);
    }
    // No module loader
    else {
            factory('', window['MODULE'] = window['MODULE'] || {}, '');
        }
})(function (require, exports, module) {

    var PopupView;
    var Ajax;
    var ClientBox;
    var ClientYoupai;
    var Wap;

    if (typeof require === 'function') {
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
        btnCountDown: '.j-zbfl-get',
        time: '.j-zbfl-countdown',
        wrap: '.niudan-chance',
        ableOpenBoxClass: 'zbfl-alble',
        minute: '.countdown-h',
        second: '.countdown-s',

        defaultTime: '5',
        status: 3,
        counting: 0,
        timer: '',
        bxId: 0,
        bxTime: 0,
        bxFlag: ''
    };

    CountDown.bind = function () {
        var _this = this;

        _this.$wrap = $(_this.wrap);
        _this.$minute = $(_this.minute);
        _this.$second = $(_this.second);
        _this.$btnCountDown = $(_this.btnCountDown);

        $("span" + _this.btnCountDownClass).bind("click", function () {
            if (!userInfo.uid || userInfo.uid == 0) {
                if (appInfo.environment == appInfo.WAP) {
                    Wap.login();
                }
                if (appInfo.environment == appInfo.BOX) {
                    ClientBox.login();
                }
                if (appInfo.environment == appInfo.YOUPAI) {
                    ClientYoupai.login();
                }
                return false;
            }
        });

        _this.$btnCountDown.bind("click", function () {

            if (!userInfo.uid || userInfo.uid == 0) {
                if (appInfo.environment == appInfo.WAP) {
                    Wap.login();
                }
                if (appInfo.environment == appInfo.BOX) {
                    ClientBox.login();
                }
                if (appInfo.environment == appInfo.YOUPAI) {
                    ClientYoupai.login();
                }
                return false;
            }

            if (pageInfo.data.zbStatus.status > 0) {
                _this.post();
            } else {
                PopupView.tip("直播已结束");
            }
        });
    };

    CountDown.update = function () {
        var _this = this;

        var uid = userInfo.uid,
            status = pageInfo.data.zbStatus.status,
            bxId = pageInfo.data.zbStatus.bxId;
        if (status == pageInfo.LIVE && bxId == 0 && uid) {
            $(_this.btnCountDownClass).html('今日夺宝次数已领完');
            _this.$wrap.removeClass(_this.ableOpenBoxClass);
        }

        /*需要倒计时开宝箱*/
        if (status == pageInfo.LIVE && bxId) {
            /*是否在倒计时*/
            if (_this.counting == 1) {
                return false;
            } else {
                _this.updateStatus(pageInfo.data.zbStatus);
            }
        } else {
            /*停止倒计时*/
            _this.counting = 0;
            if (status != pageInfo.LIVE) {
                clearTimeout(_this.timer);
                $(_this.time).html(_this.formatTime(0));
            }
            _this.$wrap.removeClass(_this.ableOpenBoxClass);
        }
    };

    CountDown.settime = function (seconds) {
        var _this = this;
        _this.formatTime(seconds);
        _this.counting = 1;

        if (seconds <= 0) {
            if (!$('.' + _this.ableOpenBoxClass).length) {
                _this.$wrap.addClass(_this.ableOpenBoxClass);
            }
            return false;
        }
        seconds--;
        _this.timer = setTimeout(function () {
            _this.settime(seconds);
        }, 1000);
    };
    CountDown.post = function () {
        var _this = this;

        Ajax.post(_zt._ztUrl + "-ajaxOpenBx", {
            _AJAX_: 1, bxId: _this.bxId, flag: _this.bxFlag, time: _this.bxTime
        }, function (result) {

            if (result.status < 0) {
                PopupView.tip(result.msg);
                return false;
            }

            if (result.status == 1) {
                PopupView.tip(result.msg);

                var times = parseInt(LOTTERY.availableLotteryNum);
                times += 1;
                LOTTERY.availableLotteryNum = times;
                $(".j-lotte-remain").html(LOTTERY.availableLotteryNum);

                _this.counting = 0;
                _this.updateStatus(result.data);
            }

            return false;
        }, 'json');
    };
    CountDown.updateStatus = function (data) {
        var _this = this;

        if (data.bxId) {
            _this.bxId = data.bxId;
            _this.bxTime = data.time;
            _this.bxFlag = data.flag;
            _this.minutes = data.minutes;
            /*判断是否正在倒计时*/
            if (!_this.counting) {
                _this.settime(_this.minutes * 60);
            }
        } else {
            $(_this.btnCountDownClass).html('今日夺宝次数已用完');
        }
        _this.$wrap.removeClass(_this.ableOpenBoxClass);
    };
    CountDown.formatTime = function (seconds) {
        var _this = this;
        var time = [parseInt(seconds / 60 % 60), parseInt(seconds % 60)].join(":").replace(/\b(\d)\b/g, "0$1");
        var _arr = time.split(':');

        _this.$minute.html(_arr[0]);
        _this.$second.html(_arr[1]);
    };

    if ({}.toString.call(module) == '[object Object]') {
        module.exports = CountDown;
    } else {
        exports.CountDown = CountDown;
    }
});

},{"./Ajax.js":1,"./ClientBox.js":2,"./ClientYoupai.js":3,"./Wap.js":4,"./m_dialog.js":8}],8:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * 模态窗模块
 */
;(function (factory) {
    // CMD/SeaJS
    if (typeof define === "function") {
        define([], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        factory(require, exports, module);
    }
    // No module loader
    else {
            factory('', window, '');
        }
})(function (require, exports, module) {

    /*基础弹窗*/
    var popup = function popup(name, data, afterInit, afterClose) {
        var pview = this;

        return ue.dialog({
            id: "j-" + name + "_popup",
            content: baidu.template(name + 'Tmpl', data),
            lock: true,
            force: true,
            closeBtn: ".dialog-close",
            init: function init() {

                var _pop = this,
                    $pop = this.obj;

                $pop.on('click', '.j-confirm,.j-cancel', function () {
                    _pop.close();
                });
                typeof afterInit === "function" && afterInit.call(this);
            },
            afterClose: afterClose
        });
    };

    var PopupView = {

        tip: function tip(msg) {
            popup("tip", { msg: msg }, function () {
                var _pop = this;

                $(".ui-dialog-mask").unbind("click");
                _pop.timer(2000, _pop.close);
            });
        },

        /*确认框*/
        confirm: function confirm(data, afterInit, afterClose) {
            popup("confirm", data, afterInit, afterClose);
        },

        /*礼包模态窗*/
        myaward: function myaward(data, afterInit, afterClose) {
            popup("myaward", data, function () {
                var _pop = this,
                    $pop = this.obj;

                typeof afterInit === "function" && afterInit.call(this);
            }, afterClose);
        },

        /*兑换码礼包模态窗*/
        giftCode: function giftCode(data, afterInit, afterClose) {
            var _this = this;
            popup("giftCode", data, function () {

                typeof afterInit === "function" && afterInit.call(this);
                $(".gift_code-link").bind("click", function () {
                    _this.tip("进入游戏内点击左上角头像-【兑换】-输入激活码");
                });
            }, function () {
                typeof afterClose === "function" && afterClose.call(this);
                $(".gift_code-link").unbind("click");
            });
        },

        /*普通礼包模态窗*/
        giftNormal: function giftNormal(data, afterInit, afterClose) {
            popup("giftNormal", data, function () {
                var _pop = this,
                    $pop = this.obj;

                typeof afterInit === "function" && afterInit.call(this);
            }, afterClose);
        },

        /*表单模态窗*/
        form: function form(data, afterInit, afterClose) {
            popup("form", data, afterInit, afterClose);
        },

        prob: function prob(afterInit, afterClose) {
            return popup("prob", {}, afterInit, afterClose);
        },

        awardList: function awardList(data, afterInit, afterClose) {
            popup("awardList", data, afterInit, afterClose);
        },

        award: function award(data, afterInit, afterClose) {
            popup("award", {}, afterInit, afterClose);
        }

    };

    if ({}.toString.call(module) == '[object Object]') {
        module.exports = PopupView;
    } else {
        exports.PopupView = PopupView;
    }
});

},{}],9:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by 4399-1068 on 2017/4/7.
 * 礼包模块
 */
;(function (factory) {
    // CMD/SeaJS
    if (typeof define === "function") {
        define(["./m_dialog.js", "./Ajax.js", "./ClientBox.js", "./ClientYoupai.js", "./Wap.js"], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
        factory(require, exports, module);
    }
    // No module loader
    else {
            factory('', window['MODULE'] = window['MODULE'] || {}, '');
        }
})(function (require, exports, module) {

    var PopupView;
    var Ajax;
    var ClientBox;
    var ClientYoupai;
    var Wap;

    if (typeof require === 'function') {
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

    function Gift(options) {

        var defaults = {
            btn: ''
        };
        this.options = $.extend(defaults, options);
        this.cache = null;

        this.init();
    }

    Gift.prototype = {

        init: function init() {
            this.$btn = $(this.options.btn);
            this.bind();
        },

        bind: function bind() {
            var _this = this;
            _this.$btn.bind("click", function () {
                _this.$target = $(this);
                _this.handle();
            });
        },

        handle: function handle() {
            var _this = this,
                code = _this.$target.attr('data-code'),
                name = _this.$target.attr('data-name');

            if (!userInfo.uid || userInfo.uid == 0) {
                _this.resolve({ status: CONFIG.UNLOGIN });
                return false;
            }

            if (code) {
                _this.resolve({ status: 2, data: { prizeName: name, code: code } });
                return false;
            }

            if (!_this.resolve({ status: CONFIG.actstatus })) {
                return false;
            }

            _this.getPrize();
        },

        getPrize: function getPrize() {
            var _this = this,
                pid = _this.$target.attr("data-pid");

            Ajax.post(_zt._ztUrl + "-ajaxGetPrize", { _AJAX_: 1, pid: pid }, function (result) {
                _this.resolve(result);
            }, "json");
        },

        resolve: function resolve(result) {

            var _this = this;

            if (result.status == CONFIG.UNLOGIN) {

                if (appInfo.environment == appInfo.WAP) {
                    Wap.login();
                }
                if (appInfo.environment == appInfo.BOX) {
                    ClientBox.login();
                }
                if (appInfo.environment == appInfo.YOUPAI) {
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

            if (result.status == CONFIG.START) {
                return true;
            }

            if (result.status == -3) {
                PopupView.tip(result.msg);
                _this.$target.attr("data-status", result.status);
                return false;
            }

            if (result.status > 0) {
                var _data = result.data;

                PopupView.giftCode({ prizeName: _data.prizeName, code: _data.code }, function () {
                    var _pop = this,
                        $pop = this.obj;

                    /*复制*/

                    if (appInfo.environment == appInfo.WAP) {
                        Wap.copy("#j-copy-btn");
                    }
                    if (appInfo.environment == appInfo.BOX) {
                        $("#j-copy-btn").bind("click", function () {
                            ClientBox.copy($("#j-copy-code").attr("value"));
                        });
                    }
                    if (appInfo.environment == appInfo.YOUPAI) {
                        $("#j-copy-btn").bind("click", function () {
                            ClientYoupai.copy($("#j-copy-code").attr("value"));
                        });
                    }
                }, function () {
                    /* typeof clipboard.destroy === "function" && clipboard.destroy();*/
                });

                if (result.status == 1) {
                    this.setState(_data);
                }
                return false;
            }
        },

        setState: function setState(data) {
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

    if ({}.toString.call(module) == '[object Object]') {
        module.exports = Gift;
    } else {
        exports.Gift = Gift;
    }
});

},{"./Ajax.js":1,"./ClientBox.js":2,"./ClientYoupai.js":3,"./Wap.js":4,"./m_dialog.js":8}],10:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by 4399-1068 on 2017/4/7.
 * 抽奖模块
 */
;(function (factory) {
    // CMD/SeaJS
    if (typeof define === "function") {
        define(["./m_dialog.js", "./m_myaward.js", "./Ajax.js", "./ClientBox.js", "./ClientYoupai.js", "./Wap.js"], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
        factory(require, exports, module);
    }
    // No module loader
    else {
            factory('', window['MODULE'] = window['MODULE'] || {}, '');
        }
})(function (require, exports, module) {

    var PopupView;
    var MyAward;
    var Ajax;
    var ClientBox;
    var ClientYoupai;
    var Wap;

    if (typeof require === 'function') {
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

    function draw(callback) {

        for (var i = 1; i <= 8; i++) {
            $(".qiu_" + i).addClass("wieyi_" + i);
        }

        setTimeout(function () {
            for (var i = 1; i <= 8; i++) {
                $(".qiu_" + i).removeClass("wieyi_" + i);
            }
            /*setTimeout(function (){*/
            callback();
            /*},900);*/
        }, 1500);

        //取消动画
        /*setTimeout(function (){
            $(".niudan_hole").find("img").removeClass("niudan-out");
        },3500)*/
    }

    function Lottery(options) {
        var _this = this;

        var defalts = {
            container: '.cjfl-lotte', /*抽奖转盘的容器*/
            start_btn: '.j-lotte-start', /*抽奖开始按钮*/
            multi_btn: '.j-lotte-start10', /*十连抽抽奖开始按钮*/
            target: '#j-lottery-panel', /*奖品列表容器*/
            prize_list: '#j-lottery-panel li', /*奖品列表*/
            lottery_count: ".j-lotte-remain" /*剩余可抽奖次数*/
        };
        this.options = $.extend(defalts, options);

        /*继承MyAward实例属性*/
        MyAward.call(this, this.options);

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

    Lottery.prototype.bind = function () {
        var _this = this;

        var handle = function handle(target) {

            /*if(_this.$container.hasClass("lottery_running")){
                return false;
            }*/

            var times = parseInt(target.attr("data-times")) || 1;
            /*在这里做未登录判断和抽奖机会判断可以减少用户非必要的等待时间和网络请求*/

            /*活动还未开启*/
            if (CONFIG.actstatus == CONFIG.NOTSTART) {
                _this.handleLottery({ status: CONFIG.NOTSTART });
                return false;
            }

            /*活动已经结束*/
            if (CONFIG.actstatus == CONFIG.GAMEOVER) {
                _this.handleLottery({ status: CONFIG.GAMEOVER });
                return false;
            }

            /*登录判断*/
            if (!userInfo.uid || userInfo.uid == 0) {
                _this.handleLottery({ status: CONFIG.UNLOGIN });
                return false;
            }

            /*if (_this.$container.hasClass("lottery_running")) {
                return false;
            }*/
            /*抽奖机会不够*/
            if (+LOTTERY.availableLotteryNum < parseInt(target.attr("data-times"))) {
                _this.handleLottery({ status: LOTTERY.NOCHANCE });
                return;
            }

            if (times == 10) {
                PopupView.confirm({
                    'title': '您确定要进行10连抽吗?'
                });
                $(".j-confirm").bind("click", function () {
                    handF(times);
                });
            } else {
                handF(times);
            }
        };

        var handF = function handF(times) {
            _this.$start_btn.addClass("lottery_running");
            /*_this.lottery.start();*/
            draw(function () {
                _this.getLottery(times);
            });
        };

        /*单次抽*/
        _this.$start_btn.bind("click", function () {
            if (_this.$start_btn.hasClass("lottery_running")) {
                return false;
            }
            handle($(this));
        });

        /*十连抽*/
        if (_this.$multi_btn) {
            _this.$multi_btn.bind("click", function () {
                var $this = $(this);

                if (_this.$start_btn.hasClass("lottery_running")) {
                    return false;
                }

                handle($this);
                return false;
            });
        }
    };

    //获取抽奖数据
    Lottery.prototype.getLottery = function (times) {
        var _this = this;

        Ajax.post(_zt._ztUrl + "-ajaxLottery", { '_AJAX_': 1, 'times': times }, function (result) {

            /*抽奖未成功*/
            if (result.status <= 0) {
                _this.handleLottery(result);
                return;
            }

            var $prized_items = _this.$target.find("img:[data-prize=" + result.data.prizeList[0].pid + "]"),
                imgUrl = $prized_items.attr("src"),
                $img = $(".niudan_hole").find("img");

            $img.attr("src", imgUrl);
            $img.load(function () {
                console.log("1");
                $img.addClass("niudan-out");

                setTimeout(function () {
                    _this.$start_btn.removeClass("lottery_running");
                    _this.handleLottery(result, times);
                }, 1000);
            });
        }, "json");
    };

    /*抽奖结果处理*/
    Lottery.prototype.handleLottery = function (result, times) {
        var _this = this;

        _this.$container.removeClass("lottery_running");
        /*
                if (index == -1) {
                    _this.$target[0].className = 'lotte-table entity_lottery';
                }*/

        /*未登录判断*/
        if (result.status == CONFIG.UNLOGIN) {
            if (appInfo.environment == appInfo.WAP) {
                Wap.login();
            }
            if (appInfo.environment == appInfo.BOX) {
                ClientBox.login();
            }
            if (appInfo.environment == appInfo.YOUPAI) {
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
            if (_pop) {
                _pop.close();
            }

            PopupView.confirm({
                'title': '夺宝次数不足，无法夺宝',
                'text': '观看直播，分享专题即可获得夺宝次数',
                'btnList': ['confirm']
            });
            return;
        }

        /*其他抽奖未成功*/
        if (result.status <= 0) {
            PopupView.tip(result.msg);
            return;
        }

        var data = result.data;

        /*中奖了 index>=0 且 prize非0*/
        /*中连抽*/
        if (times > 1) {
            /*弹出列表模态窗*/
            PopupView.myaward({
                contentTmpl: $(_this.options.loadingTmpl).html()
            }, function () {
                var _pop = ue.dialog.list["j-myaward_popup"];
                /*渲染列表*/
                _this.renderList(data, 1);
                /*缓存列表信息*/
                _this.infoList[1] = data;
                $('.dialog-title').html("恭喜您，获得了");
                _pop.reset();
            }, function () {
                $('.j-myawardWatch').unbind('click');
            });

            _this.updateTimes(data.lastTimes);
            return;
        }

        /*中单次*/
        var _data = data.prizeList[0];
        if (_data.kind == 0) {
            PopupView.confirm({
                'title': '夺宝失败，请继续努力~',
                'btnList': ['confirm']
            }, function () {}, function () {
                $(".niudan_hole").find("img").unbind("load").attr("src", "").removeClass("niudan-out");
            });
        }
        if (_data.kind == AWARD.GIFT) {

            PopupView.giftCode(_data, function () {
                var _pop = this,
                    $pop = this.obj;

                /*复制*/
                if (appInfo.environment == appInfo.WAP) {
                    Wap.copy("#j-copy-btn");
                }
                if (appInfo.environment == appInfo.BOX) {
                    $("#j-copy-btn").bind("click", function () {
                        ClientBox.copy($("#j-copy-code").attr("value"));
                    });
                }
                if (appInfo.environment == appInfo.YOUPAI) {
                    $("#j-copy-btn").bind("click", function () {
                        ClientYoupai.copy($("#j-copy-code").attr("value"));
                    });
                }
            }, function () {
                $(".niudan_hole").find("img").unbind("load").attr("src", "").removeClass("niudan-out");
            });
        }
        if (_data.kind == AWARD.UNNEED_UINFO) {
            userInfo.integral = data.score;
            $(".j-integral").html(userInfo.integral);
            PopupView.giftNormal(_data, function () {}, function () {
                $(".niudan_hole").find("img").unbind("load").attr("src", "").removeClass("niudan-out");
            });
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

    Lottery.prototype.updateTimes = function (lastTimes) {
        var _this = this;
        LOTTERY.availableLotteryNum = lastTimes;
        _this.$lottery_count.html(lastTimes);
    };

    /*function getInstanceHandle() {
        return function (options) {
            return new MyAward(options);
        };
    }*/

    if ({}.toString.call(module) == '[object Object]') {
        module.exports = Lottery;
    } else {
        exports.Lottery = Lottery;
    }
});

},{"./Ajax.js":1,"./ClientBox.js":2,"./ClientYoupai.js":3,"./Wap.js":4,"./m_dialog.js":8,"./m_myaward.js":11}],11:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by 4399-1068 on 2017/4/7.
 * 我的奖品模块
 */
;(function (factory) {
    // CMD/SeaJS
    if (typeof define === "function") {
        define(["./m_dialog.js", "./Ajax.js", "./ClientBox.js", "./ClientYoupai.js", "./Wap.js"], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
        factory(require, exports, module);
    }
    // No module loader
    else {
            factory('', window['MODULE'] = window['MODULE'] || {}, '');
        }
})(function (require, exports, module) {

    var PopupView;
    var Ajax;
    var ClientBox;
    var ClientYoupai;
    var Wap;

    if (typeof require === 'function') {
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

    function MyAward(options) {

        var defaults = {
            btn: '.j-myaward',
            myawardTmpl: '#myawardTmpl',
            loadingTmpl: '#loadingTmpl',
            dataTmpl: '#myawardDataTmpl',
            nodataTmpl: '#myawardNodataTmpl',
            bodyNode: '.dialog-body',
            listNode: '.myaward-list',
            itemTmpl: 'myawardItemTmpl'
        };
        this.options = $.extend(defaults, options);
        this.cache = null;
        this.prizeList = [];
    }

    MyAward.prototype = {

        bind: function bind() {
            var myaward = this;

            $(this.options.btn).bind("click", function (e) {

                /*判断是否登陆*/
                if (!userInfo.uid || userInfo.uid == 0) {
                    if (appInfo.environment == appInfo.WAP) {
                        Wap.login();
                    }
                    if (appInfo.environment == appInfo.BOX) {
                        ClientBox.login();
                    }
                    if (appInfo.environment == appInfo.YOUPAI) {
                        ClientYoupai.login();
                    }
                    return false;
                }

                /*弹出列表模态窗*/
                PopupView.myaward({
                    body_tmpl: $(myaward.options.loadingTmpl).html()
                }, function () {
                    /*获取列表数据*/
                    myaward.getListData();
                }, function () {

                    /*清楚复制组件内存*/
                    if (myaward.copy) {
                        for (var i = 0; i < myaward.copy.length; i++) {
                            if (myaward.copy[i]) {
                                myaward.copy[i].close();
                            }
                        }
                        delete myaward.copy;
                    }

                    /*解绑事件*/
                    $('.j-myawardWatch').unbind('click');
                });

                return false;
            });
        },

        getListData: function getListData() {
            var myaward = this;

            Ajax.post(myaward.options.urlGetMyPrizes, { _AJAX_: 1 }, function (result) {

                var _pop = ue.dialog.list["j-myaward_popup"];
                if (_pop) {
                    var $pop = _pop.obj;
                    if (result.status > 0) {
                        /*渲染列表*/
                        myaward.renderList(result.data, 1);
                        myaward.prizeList = result.data.prizeList;
                    } else if (result.status == AWARD.NOAWARD_DATA) {
                        /*列表数据为空*/
                        $pop.find(myaward.options.bodyNode).html($(myaward.options.nodataTmpl).html());
                    } else {
                        PopupView.tip(result.msg);
                        _pop.close();
                    }
                    _pop.reset();
                }
            }, "json");
        },

        renderList: function renderList(data, page) {
            var myaward = this,
                popMyAward = ue.dialog.list["j-myaward_popup"],
                $popMyAward = popMyAward.obj,
                pageCount = Math.ceil(data.prizeList.length / data.perPage);

            /*渲染列表*/
            $popMyAward.find(myaward.options.bodyNode).html($(myaward.options.dataTmpl).html());
            var $list = $(myaward.options.listNode),
                list = data.prizeList.slice((page - 1) * data.perPage, page * data.perPage),
                _html = "";
            for (var i = 0; i < list.length; i++) {
                _html += baidu.template(myaward.options.itemTmpl, list[i]);
            }
            $list.html(_html);

            /*渲染分页*/
            ue.pager({
                //target: $pop.find(".list_pager"),//放置分页的元素
                pagerTarget: $popMyAward.find(".dialog-pager"),
                first: '',
                firstDisabled: '',
                last: '',
                lastDisabled: '',
                prev: '<a href="#" class="pager-pre">上一页</a>',
                prevDisabled: '<span style="color:#747474;" class="pager-pre">上一页</span>',
                next: '<a href="#" class="pager-next">下一页</a>',
                nextDisabled: '<span style="color:#747474;" class="pager-next">下一页</span>',
                current: '<span class="cur">@{page}</span>',
                page: '<a href="#">@{page}</a>',
                tip: '<span class="pager-count">@{nowPage}/@{pageCount}</span>',
                goto: '',
                now: page, //当前页
                maxPage: 5, //显示的最多页数
                per: data.perPage,
                pageCount: pageCount,
                onchange: function onchange(page) {
                    //切换页数回调函数
                    myaward.renderList(data, page);
                }
            });

            /*注册列表事件*/
            $('.j-myawardWatch').bind('click', function (e) {
                var $this = $(this),
                    _id = $this.closest('li').attr('data-id'),
                    _data = myaward.getPrizeListItem(_id);

                myaward.form(_data, this);
                return false;
            });
            $('.j-myawardGame').bind('click', function () {
                var $this = $(this),
                    _id = $this.closest('li').attr('data-id'),
                    _data = myaward.getPrizeListItem(_id);

                myaward.games(_data, this);
                return false;
            });

            /*注册复制组件*/
            var item;
            for (var i = 0; item = list[i], i < list.length; i++) {
                /*myaward.copy = myaward.copy || [];
                if(item.kind == AWARD.GIFT){
                    myaward.copy[i] = ue.copy({
                        btnId: "j-copy-btn" + item.id,
                        txtId: 'j-copy-code' + item.id,
                        container: $popMyAward.find(".dialog-body")[0],
                        success: function () {
                            PopupView.tip("已复制到剪切板，可通过ctrl+v粘贴");
                        }
                    });
                }*/
                /*复制*/
                if (item.kind != 1) {
                    continue;
                }
                if (appInfo.environment == appInfo.WAP) {
                    Wap.copy("#j-copy-btn" + item.id);
                }
                if (appInfo.environment == appInfo.BOX) {
                    $("#j-copy-btn" + item.id).bind("click", function (id) {
                        return function () {
                            ClientBox.copy($("#j-copy-code" + id).attr("value"));
                        };
                    }(item.id));
                }
                if (appInfo.environment == appInfo.YOUPAI) {
                    $("#j-copy-btn" + item.id).bind("click", function (id) {
                        return function () {
                            ClientYoupai.copy($("#j-copy-code" + id).attr("value"));
                        };
                    }(item.id));
                }
            }
        },

        getPrizeListItem: function getPrizeListItem(id) {
            var myaward = this;
            if (myaward.prizeList) {
                for (var i = 0; i < myaward.prizeList.length; i++) {
                    if (id == myaward.prizeList[i].id) return myaward.prizeList[i];
                }
            }
        },

        form: function form(_data, target) {
            var myaward = this;

            /*弹出表单模态窗*/
            PopupView.form(_data, function () {

                var _pop = this,
                    $pop = this.obj;

                var $form = $(".j-form");
                $(".j-submit").bind("click", function () {

                    /*验证表单处理*/
                    var validate = true;
                    var phoneReg = /^0?(13|14|15|17|18)[0-9]{9}$/;
                    var qqReg = /^[1-9][0-9]{4,11}$/;
                    $form.find("input[type=text]").each(function () {
                        var _$this = $(this);
                        if ($.trim(_$this.val()) == "") {
                            PopupView.tip("请填写完整信息");
                            validate = false;
                            return false;
                        }
                    });

                    if ($.trim($form.find("textarea").val()) == "") {
                        PopupView.tip("请填写完整信息");
                        validate = false;
                        return false;
                    }

                    var phone = $.trim($('input[name=uphone]').val());
                    if (!phoneReg.test(phone)) {
                        PopupView.tip("请填写正确的电话号码");
                        validate = false;
                        return false;
                    }

                    /*var qq = $.trim($('input[name=uqq]').val());
                    if(!qqReg.test(qq)){
                        PopupView.tip("请填写正确的QQ号码");
                        validate = false;
                        return false;
                    }*/

                    if (validate) {

                        /*提交表单*/
                        Ajax.post(myaward.options.urlWriteUserInfo, $form.serialize() + "&_AJAX_=1", function (result) {
                            if (result.status == 1) {
                                _pop.close();
                                PopupView.tip(result.msg);

                                /*更新缓存列表信息*/
                                if (target) {
                                    var _arr = $form.serialize().split("&"),
                                        _item;
                                    _item = myaward.getPrizeListItem(_arr[0].split("=")[1]);
                                    _item.uinfo = {
                                        uname: decodeURIComponent(_arr[1].split("=")[1]),
                                        uphone: _arr[2].split("=")[1],
                                        uaddress: decodeURIComponent(_arr[3].split("=")[1])
                                    };
                                    $(target).text("【查看，您的收件信息】");
                                }
                            } else {
                                PopupView.tip(result.msg);
                            }
                        }, "json");
                    }
                });
            }, function () {
                $(".niudan_hole").find("img").unbind("load").attr("src", "").removeClass("niudan-out");
            });
        }

    };

    /*function getInstanceHandle() {
        return function (options) {
            return new MyAward(options);
        };
    }*/

    if ({}.toString.call(module) == '[object Object]') {
        module.exports = MyAward;
    } else {
        exports.MyAward = MyAward;
    }
});

},{"./Ajax.js":1,"./ClientBox.js":2,"./ClientYoupai.js":3,"./Wap.js":4,"./m_dialog.js":8}]},{},[5]);
