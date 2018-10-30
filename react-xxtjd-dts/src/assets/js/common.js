import axios from 'axios';
import qs from 'qs';

window.ztUrl = 'http://';
window.ztInfo = {
    status : "3"
},
window.userInfo = {
    scookie : "",
    uid : "",
    nick : "",
    avatar : "",
    level : ""
}
window.appInfo = {
    environment : "",
    environmentMode : "",
    checkIphone : "",
    mobiLoginUrl : "",
},
window.packageInfo = {
    "id": "<{$tplCfg.pkg.id}>",
    "packageName": "<{$tplCfg.pkg.pkgname}>",
    "appName": "<{$tplCfg.pkg.appname}>",
    "downloadUrl": "<{$tplCfg.pkg.downurl}>",
    "iconPath": "<{$tplCfg.pkg.icopath}>",
    "fileMD5": "<{$tplCfg.pkg.md5}>",
    "downloadUrlForIos" : '<{$tplCfg.ymnr.urlIos}>',
    "downloadUrlForAdroid" : '<{$tplCfg.ymnr.urlAz}>'
},
window.shareInfo = {
    img: "分享的图片",/*分享的图片*/
    url: document.location.href,/*分享的地址*/
    title: "分享的标题",/*分享的标题*/
    desc: "分享信息描述，给朋友时需要"/*分享信息描述，给朋友时需要*/
},
window.CONFIG = {
    START: 3,                                    
    NOTSTART: -5,                                
    GAMEOVER: -6,

    UNLOGIN:-1,

    LIVE : 1,
    NO_LIVE : -6,
    PLAY_BACK : -5,

    AWARD: 1,
    UNAWARD: 0,
    NOCHANCE: -2,

    NOAWARD_DATA : -2,

    GIFT : 1,/*礼包*/
    UNNEED_UINFO : 2,/*不要用户信息的奖品 如游币 积分 单个武器*/
    NEED_UINFO : 3,/*需要用户填写信息的奖品 如实物*/
    COLLECTIONS : 4,/*奖品集合 如武器集合、礼包集合*/

    BOX : 'box',
    YOUPAI : 'youpai',
    WAP : 'pc',
    PRO : 'PRO',
    IOS : "ios",
    ANDROID : "android"
};

window.Ajax = {

    get : function(url = ``, data){
        
        if(userInfo.scookie){
            typeof data === "string" ? data = data + "&scookie=" + userInfo.scookie : data.scookie = userInfo.scookie;
        }else{
            typeof data === "string" ? data = data + "&_AJAX_=1" : data['_AJAX_'] = 1;
        }
        return fetch(url)  //TODO
            .then(response => response.json());
    },

    post : function(url = ``, data){
        
        if(userInfo.scookie){
            typeof data === "string" ? data = data + "&scookie=" + userInfo.scookie : data.scookie = userInfo.scookie;
        }else{
            typeof data === "string" ? data = data + "&_AJAX_=1" : data['_AJAX_'] = 1;
        }
       
        return axios({
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url,
        })
        .then(response => response.data); // parses response to JSON
    }
}


