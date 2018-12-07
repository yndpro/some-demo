import {PopupView} from '../components/PopView';

function appDownload(options){

    var downAppInfo = {
        downloadUrl: packageInfo.downloadUrl,
        packageName: packageInfo.packageName,
        appName: packageInfo.appName,
        iconPath: packageInfo.iconPath,
        fileMD5: packageInfo.fileMD5
    };
    
    var downloadAPI = window.downloadAPI || window.android;

    var btn = options.btn || ".j-download";
    var stateTxt = options.stateTxt || ".j-down-state";
    var nbtn = document.querySelector(btn);
    var nStateTxt = document.querySelector(stateTxt);

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
            PopupView.confirm({
                'title':'已开始下载，可在游戏盒下载后台查看进度',
                'btnList':['confirm']
            });
            handle = function(){downloadAPI.pauseDownload(packageInfo.packageName);}
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
            handle = function(){downloadAPI.installApp(packageInfo.packageName);}
        },
        status_201: function () {
            nbtn.innerHTML = '开始游戏';
            handle = function(){downloadAPI.launchApp(packageInfo.packageName);}
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
        strategies['status_' + status]();
    };

    window.updateApp = function (res) {
        var status = res.status;
        strategies['status_' + status]();
    };
    downloadAPI.getAppStatus(packageInfo.packageName,'updateApps');
    downloadAPI.bindEvent("download","updateApp");

    nbtn.addEventListener('click',function(){
        handle();
    });

}


export {appDownload};