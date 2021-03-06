import Mock from 'mockjs';

Mock.mock(host + '-ajaxGetPrize', {
    "status":"1",
    "msg":"领取成功",
    "data":{
        "prizeName":"礼包1111111",
        "point":10,
        "prizeDisabled":"1",
        "code":"301362655_4"
    }
});

Mock.mock(host + '-ajaxSignIn', {
    "status":1,
    "msg":"签到成功",
    "data":{
        "num":3,
        "n":"10",
        "j":"2"
    }
});

Mock.mock(host + '-ajaxInitApp', {
    "status":1,
    "msg":"游戏盒初始化",
    "data":{

        // 基础信息
        "zt":{
            "status" : "3",
            "environment" : "DEV",
            "checkIphone" : "0",
            "mobiLoginUrl" : "https://ptlogin.4399.com/oauth2/authorize.do?client_id=d897905d72f1403986a4c03f786c6b80&redirect_uri=" + location.href + "&response_type=code",
        },
        
        // 游戏包信息
        "pkg" : {
            "id": "<{$tplCfg.pkg.id}>",
            "packageName": "<{$tplCfg.pkg.pkgname}>",
            "appName": "<{$tplCfg.pkg.appname}>",
            "downloadUrl": "<{$tplCfg.pkg.downurl}>",
            "iconPath": "<{$tplCfg.pkg.icopath}>",
            "fileMD5": "<{$tplCfg.pkg.md5}>",
        },
        
        // 游戏包下载链接
        "downloadUrlForIos" : null,
        "downloadUrlForAdroid" : null,

        // 分享信息
        "shareInfo" : {
            "img": "<{$tplCfg.ymnr.shareImg}>",/*分享的图片*/
            "url": document.location.href,/*分享的地址*/
            "title": "<{$tplCfg.ymnr.shareTitle}>",/*分享的标题*/
            "desc": "<{$tplCfg.ymnr.shareDesc}>"/*分享信息描述，给朋友时需要*/
        },

        // 用户信息
        "uid":"301362655",
        "nick":"4399厦门充值测试",

        "pageInfo":{
            "time": "2018.12.07-2018.12.24",
            "isShare":false,
            "point":30,
            "lastTimes":30,
            "dhPrize":[
                {
                    "code":"301362655_8",
                    "p_name":"10积分礼包",
                    "pid":8,
                    "integral":10,
                    "img":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    "detail":"内容内容内容111111|内容内容内容|内容内容内容|内容内容内容"
                },
                {
                    "code":"",
                    "p_name":"30积分礼包",
                    "pid":3,
                    "integral":30,
                    "img":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    "detail":"内容内容内容2222222|内容内容内容|内容内容内容|内容内容内容"
                },
                {
                    "code":"",
                    "p_name":"50积分礼包",
                    "pid":5,
                    "integral":50,
                    "img":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    "detail":"内容内容内容333333333|内容内容内容|内容内容内容|内容内容内容"
                },
                {
                    "code":"",
                    "p_name":"100积分礼包",
                    "pid":10,
                    "integral":100,
                    "img":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    "detail":"内容内容内容333333333|内容内容内容|内容内容内容|内容内容内容"
                }
            ],
            "award":[
                {
                    "stage":"冠军",
                    "img":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    "detail":"内容内容内容111111|内容内容内容|内容内容内容|内容内容内容"
                },
                {
                    "stage":"亚军",
                    "img":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    "detail":"内容内容内容2222222|内容内容内容|内容内容内容|内容内容内容"
                },
                {
                    "stage":"四强",
                    "img":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    "detail":"内容内容内容333333333|内容内容内容|内容内容内容|内容内容内容"
                }
            ],
            "jc": [
                {
                    "id":"1",
                    "name": "八强竞猜",
                    "list": [
                        {
                            "team1": {
                                "mid": 9,
                                "win": 0,
                                "status": "2",
                                "name": "强者无敌1强者无敌1强者无敌1",
                                "id": "1"
                            },
                            "team2": {
                                "mid": 9,
                                "win": 1,
                                "status": "3",
                                "name": "强者无敌5强者无敌5强者无敌5",
                                "id": "5"
                            }
                        },
                        {
                            "team1": {
                                "mid": 10,
                                "win": 1,
                                "status": "3",
                                "name": "强者无敌2强者无敌2强者无敌2",
                                "id": "2"
                            },
                            "team2": {
                                "mid": 10,
                                "win": 0,
                                "status": "2",
                                "name": "强者无敌6",
                                "id": "6"
                            }
                        },
                        {
                            "team1": {
                                "mid": 11,
                                "win": 0,
                                "status": "3",
                                "name": "强者无敌3",
                                "id": "3"
                            },
                            "team2": {
                                "mid": 11,
                                "win": 1,
                                "status": "2",
                                "name": "强者无敌7",
                                "id": "7"
                            }
                        },
                        {
                            "team1": {
                                "mid": 12,
                                "win": 1,
                                "status": "3",
                                "name": "强者无敌4",
                                "id": "4"
                            },
                            "team2": {
                                "mid": 12,
                                "win": 0,
                                "status": "2",
                                "name": "强者无敌8",
                                "id": "8"
                            }
                        }
                    ]
                },
                {
                    "id":"2",
                    "name": "四强竞猜",
                    "list": [
                        {
                            "team1": {
                                "mid": 9,
                                "win": 0,
                                "status": "4",
                                "name": "强者无敌1强者无敌1强者无敌1",
                                "id": "1"
                            },
                            "team2": {
                                "mid": 9,
                                "win": 1,
                                "status": "4",
                                "name": "强者无敌5强者无敌5强者无敌5",
                                "id": "5"
                            }
                        },
                        {
                            "team1": {
                                "mid": 10,
                                "win": 1,
                                "status": "4",
                                "name": "强者无敌2强者无敌2强者无敌2",
                                "id": "2"
                            },
                            "team2": {
                                "mid": 10,
                                "win": 0,
                                "status": "4",
                                "name": "强者无敌6",
                                "id": "6"
                            }
                        },
                        {
                            "team1": {
                                "mid": 11,
                                "win": 0,
                                "status": "4",
                                "name": "强者无敌3",
                                "id": "3"
                            },
                            "team2": {
                                "mid": 11,
                                "win": 1,
                                "status": "4",
                                "name": "强者无敌7",
                                "id": "7"
                            }
                        },
                        {
                            "team1": {
                                "mid": 12,
                                "win": 1,
                                "status": "4",
                                "name": "强者无敌4",
                                "id": "4"
                            },
                            "team2": {
                                "mid": 12,
                                "win": 0,
                                "status": "4",
                                "name": "强者无敌8",
                                "id": "8"
                            }
                        }
                    ]
                },
                {
                    "id":"3",
                    "name": "季军竞猜",
                    "list": [
                        {
                            "team1": {
                                "mid": 5,
                                "win": 1,
                                "status": "1",
                                "name": "强者无敌5强者无敌5强者无敌5",
                                "id": "5"
                            },
                            "team2": {
                                "mid": 5,
                                "win": 0,
                                "status": "1",
                                "name": "强者无敌2强者无敌2强者无敌2",
                                "id": "2"
                            }
                        },
                        {
                            "team1": {
                                "mid": 6,
                                "win": 0,
                                "status": "1",
                                "name": "强者无敌7",
                                "id": "7"
                            },
                            "team2": {
                                "mid": 6,
                                "win": 1,
                                "status": "1",
                                "name": "强者无敌4",
                                "id": "4"
                            }
                        }
                    ]
                },
                {
                    "id":"4",
                    "name": "冠军竞猜",
                    "list":"",
                    "startTime":"2018年10月20日"
                    /*"list": [
                        {
                            "team1": {
                                "mid": 3,
                                "win": 1,
                                "status": "1",
                                "name": "强者无敌5强者无敌5强者无敌5",
                                "id": "5"
                            },
                            "team2": {
                                "mid": 3,
                                "win": 0,
                                "status": "1",
                                "name": "强者无敌4",
                                "id": "4"
                            }
                        },
                        {
                            "team1": {
                                "mid": 4,
                                "win": 1,
                                "status": "1",
                                "name": "强者无敌999",
                                "id": "9"
                            },
                            "team2": {
                                "mid": 4,
                                "win": 0,
                                "status": "1",
                                "name": "强者无敌10",
                                "id": "10"
                            }
                        }
                    ]*/
                }
            ],
            "zbStatus":{
                "status":1,
                "headTit":"赛事直播",
                "freshBlank":1000,
                "id":"1",
                "tit":"八强赛",
                "start":"20180926 13:50",
                "end":"20180929 18:00",
                "yp":"http://video.yxhhdl.com/pullvideo/201808/08b126fc016510005ac55bb500000000/cloudv-transfer/555555551542o20055560165sorq6o35_0_3.mp4",
                "p1":"09-16 14:00",
                "spCover":"//fs.img4399.com/dj~2018/09/14/17_zROZcGFzC3.640x360.jpg",
                "startTime":1537941000,
                "endTime":1538215200,
                "day":"20180926",
                "defaultImg":"http://fs.img4399.com/dj~2018/09/14/17_zROZcGFzC3.640x360.jpg",
    
                "zbId":"485938",
    
                "minutes":"0.1",
                "bxId":1,
                "time":1538039714,
                "flag":"d6d61690a1b7a8251859e225cf8301b9"
            },
            "zbList":[
                {
                    "id":"1",
                    "closest":true,
                    "tit":"八强赛",
                    "start":"20180926 13:50",
                    "end":"20180929 18:00",
                    "yp":"485938",
                    "p1":"09-16 14:00",
                    "cover":"//fs.img4399.com/dj~2018/09/14/17_zROZcGFzC3.640x360.jpg",
                    "status":1,
                    "cnStatus":"正在直播"
                },
                {
                    "id":"2",
                    "closest":false,
                    "tit":"半决赛",
                    "start":"20180923 13:50",
                    "end":"20180923 18:00",
                    "yp":"485938",
                    "p1":"09-23 14:00",
                    "cover":"//fs.img4399.com/dj~2018/09/14/17_8kDpVJ05Gu.640x360.jpg",
                    "status":3,
                    "cnStatus":"已结束"
                },
                {
                    "id":"3",
                    "closest":false,
                    "tit":"决赛（含季军）",
                    "start":"20180924 13:50",
                    "end":"20180924 18:00",
                    "yp":"485938",
                    "p1":"09-24 14:00",
                    "cover":"//fs.img4399.com/dj~2018/09/14/17_DxYCXQnUJU.640x360.jpg",
                    "status":3,
                    "cnStatus":"已结束"
                }
            ],
            "lottery":{
                "prizes":[
                    {
                        "pid":"1",
                        "name":"奖品1",
                        "pic":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    },
                    {
                        "pid":"2",
                        "name":"奖品2",
                        "pic":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    },
                    {
                        "pid":"3",
                        "name":"奖品3",
                        "pic":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    },
                    {
                        "pid":"4",
                        "name":"奖品4",
                        "pic":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    },
                    {
                        "pid":"5",
                        "name":"奖品5",
                        "pic":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    },
                    {
                        "pid":"6",
                        "name":"奖品6",
                        "pic":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    },
                    {
                        "pid":"7",
                        "name":"奖品7",
                        "pic":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    },
                    {
                        "pid":"8",
                        "name":"奖品8",
                        "pic":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    },
                ]
            }
        },
        
    }
});

Mock.mock(host + '-ajaxGuess', {
    "status":1,
    "msg":"竞猜成功",
    "data":{}
});

Mock.mock(host + '-ajaxShare', {
    "status":1,
    "msg":"分享成功！",
    "data":{
        "point" : 40
    }
});

Mock.mock(host + '-ajaxGetZbList', {
    "status":1,
    "msg":"直播信息",
    "data":{
        "uid":301362655,
        "lastTimes":5,
        "nick":"4399厦门充值测试",
        "zbStatus":{
            "status":3,
            "headTit":"赛事直播",
            "freshBlank":1000,
            "id":"1",
            "tit":"八强赛",
            "start":"20180926 13:50",
            "end":"20180929 18:00",
            "yp":"http://mapi.4399youpai.com/live/detail/frame/485938.html?source=dj&ishowgift=0&ishowchat=0&iswidauto=1",
            "spUrl":"http://video.5054399.com/video/wsplayer_mobile.swf?flvID=353434&autoplay=1&pscale=1&isshade=0&pdomain=video.5054399.com/4399video/",
            "p1":"09-16 14:00",
            "cover":"//fs.img4399.com/dj~2018/09/14/17_zROZcGFzC3.640x360.jpg",
            "startTime":1537941000,
            "endTime":1538215200,
            "day":"20180926",
            "defImg":"http:////fs.img4399.com/dj~2018/09/14/17_zROZcGFzC3.640x360.jpg",

            "zbId":"485938",

            "minutes":"0.1",
            "bxId":1,
            "time":1538039714,
            "flag":"d6d61690a1b7a8251859e225cf8301b9"
        },
        "zbList":[
            {
                "id":"1",
                "tit":"八强赛",
                "start":"20180926 13:50",
                "end":"20180929 18:00",
                "yp":"485938",
                "p1":"09-16 14:00",
                "cover":"//fs.img4399.com/dj~2018/09/14/17_zROZcGFzC3.640x360.jpg",
                "status":1,
                "cnStatus":"正在直播"
            },
            {
                "id":"2",
                "tit":"半决赛",
                "start":"20180923 13:50",
                "end":"20180923 18:00",
                "yp":"485938",
                "p1":"09-23 14:00",
                "cover":"//fs.img4399.com/dj~2018/09/14/17_8kDpVJ05Gu.640x360.jpg",
                "status":3,
                "cnStatus":"已结束"
            },
            {
                "id":"3",
                "tit":"决赛（含季军）",
                "start":"20180924 13:50",
                "end":"20180924 18:00",
                "yp":"485938",
                "p1":"09-24 14:00",
                "cover":"//fs.img4399.com/dj~2018/09/14/17_DxYCXQnUJU.640x360.jpg",
                "status":3,
                "cnStatus":"已结束"
            }
        ]
    }
});

Mock.mock(host + '-ajaxOpenBx', {
    "status":1,
    "msg":"领取成功，请及时使用夺宝次数",
    "data":{
        "lastTimes":2,
        "minutes":"0.1",
        "bxId":2,
        "time":1538191800,
        "flag":"7b72e590569277af2d134f36f6f4bedc"
    }
});

Mock.mock(host + '-ajaxWriteUserInfo', {
    "status":1,
    "msg":"报名成功",
    "data":{}
});

Mock.mock(host + 'ajaxWriteDhUserInfo', {
    "status":1,
    "msg":"报名成功22",
    "data":{}
});

Mock.mock(host + 'ajaxVote.cn', {
    "status":1,
    "msg":"投票成功",
    "data":{
        "por1":"60",
        "por2":"40"
    }
});



Mock.mock(host + '-ajaxLottery', {
    "status":1,
    "msg":"抽奖成功",
    "data":{
        "prizeList":[
            {
                "pid":2,
                "prizeName":"20积分",
                "kind":3,
                "code":"301362655_2"
            }
        ],
        "score":20,
        "lastTimes":5,
        "show":1
    }
});


Mock.mock(host + 'ajaxGetCode.cn', {
    "status":1,
    "msg":"抽签成功",
    "data":{
        "id":"",
        "prizeName":"礼包名称",
        "code":"2453254234",
        "pid":"66",
        "kind":"1",
        "yxId" : "1",
        "url":"http:\/\/ssjj.4399.com",
        "countTimes":10
    }
});


Mock.mock(host + 'ajaxOpenBx.cn', {
    "status":1,
    "msg":"领取成功，请及时使用夺宝次数",
    "data":{
        "minutes":"0.1",
        "bxId":23,
        "time":1499750100,
        "flag":"0d95b3c03b237f0e0c61a6c95acc32ca"
    }
});


Mock.mock(host + 'ajaxExchange.cn', {
    "status":1,
    "msg":"兑换成功！",
    "data":{
        "pid":22222,
        "prizeName":"咸鱼背包",
        "kind":3
    }
});

Mock.mock(host + '-ajaxGetRoleName', {
    "status":1,
    "msg":"获取成功！",
    "data":{
        "rolename":"扑街111"
    }
});

Mock.mock(host + '-ajaxGetTaskInfo', {
    "status":1,
    "msg":"获取成功",
    "data":{
        "rolename":"扑街",
        "score":"3000",
        "taskInfo":[
            {
                "taskId":1,
                "isFinish":1
            },
            {
                "taskId":2,
                "isFinish":1
            },
            {
                "taskId":3,
                "isFinish":0
            },
            {
                "taskId":4,
                "isFinish":1
            }
        ]
    }
});




Mock.mock(host + '-ajaxGetMyPrize', {
    "status": 1,
    "msg": "奖品信息",
    "data": {
        "perPage": 4,//每页个数
        "prizeList": [
            {
                "id": "1",
                "pid": "0",
                "prizeName": "XXXXX1",
                "kind": 2,

                //如果是礼包 kind = 1
                "code": "1267645584_0",

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": {
                    "uname": "xxxx",//用户姓名
                    "uphone": "110",//用户联系方式
                    "uaddress": "xxxxxx"//用户地址
                },

                "url":"http:\/\/ssjj.4399.com"
            },

            {
                "id": "11",
                "pid": "1",
                "prizeName": "XXXXX1",
                "kind": 3,

                //如果是礼包 kind = 1
                "code": "1267645584_22",

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": {
                    "uname": "xxxx",//用户姓名
                    "uphone": "110",//用户联系方式
                    "uaddress": "xxxxxx"//用户地址
                }
            },

            {
                "id": "22",
                "pid": "2",
                "prizeName": "XXXXX2",
                "kind": 1,

                //如果是礼包 kind = 1
                "code": "1111111",

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": {
                    "uname": "xxxx",//用户姓名
                    "uphone": "110",//用户联系方式
                    "uaddress": "xxxxxx"//用户地址
                },

                "url":"http:\/\/ssjj.4399.com"
            },

            {
                "id": "222",
                "pid": "3",
                "prizeName": "XXXXX2",
                "kind": 1,

                //如果是礼包 kind = 1
                "code": "2222222",

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": {
                    "uname": "xxxx",//用户姓名
                    "uphone": "110",//用户联系方式
                    "uaddress": "xxxxxx"//用户地址
                },

                "url":"http:\/\/ssjj.4399.com"
            },

            {
                "id": "333",
                "pid": "4",
                "prizeName": "XXXXX2",
                "kind": 1,

                //如果是礼包 kind = 1
                "code": "33333333",

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": {
                    "uname": "xxxx",//用户姓名
                    "uphone": "110",//用户联系方式
                    "uaddress": "xxxxxx"//用户地址
                },

                "url":"http:\/\/ssjj.4399.com"
            },


            {
                "id": "4444",
                "pid": "77",
                "prizeName": "XXXXX4",
                "kind": 3,

                //如果是礼包 kind = 1
                "code": "1267645584_22",

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": null

            },

            {
                "id": "55555",
                "pid": "1",
                "prizeName": "XXXXX4",
                "kind": 4,

                //如果是礼包 kind = 1
                "code": "1267645584_22",

                //如果是需要用户填写信息的奖品 如实物 kink = 3
                "uinfo": null

            }

        ]
    }
});







