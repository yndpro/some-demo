/*
* 游戏盒下载游戏包模块
*
* */
;(function(factory) {
    // CMD/SeaJS
    if(typeof define === "function") {
        define([],factory);
    }else if(typeof exports === 'object'){
        factory(require, exports, module);
    }
    // No module loader
    else {
        factory('', window = window || {}, '');
    }

}(function(require, exports, module) {

    function boxDownload(options){
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
        var handle = function(){};

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
            status_200: function () {
                nStateTxt.innerHTML = '解压数据包';
            },
            status_100: function () {
                nbtn.innerHTML = '暂停下载';
                handle = function(){downloadAPI.pauseDownload(appInfo.packag);}
            },
            status_101: function () {
                nbtn.innerHTML = '继续下载';
                handle = function(){downloadAPI.downloadApp(JSON.stringify(downAppInfo));}
            },
            status_102: function () {
                nStateTxt.innerHTML = '等待';
            },
            status_103: function () {
                nbtn.innerHTML = '安装游戏';
                handle = function(){downloadAPI.installApp(appInfo.packag);}
            },
            status_201: function () {
                nbtn.innerHTML = '开始游戏';
                handle = function(){downloadAPI.launchApp(appInfo.packag);}
            },
            status_202: function () {
                nbtn.innerHTML = '更新游戏';
                handle = function(){downloadAPI.downloadApp(JSON.stringify(downAppInfo));};
            },
            status_0: function () {
                nbtn.innerHTML = '游戏下载';
                handle = function(){downloadAPI.downloadApp(JSON.stringify(downAppInfo));};
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
        downloadAPI.getAppStatus(appInfo.packag,'updateApps');
        downloadAPI.bindEvent("download","updateApp");

        nbtn.addEventListener('click',function(){
            handle();
        });

    }

    if( {}.toString.call(module) == '[object Object]' ){
        module.exports = boxDownload;
    }else{
        exports.boxDownload = boxDownload;
    }

}));

