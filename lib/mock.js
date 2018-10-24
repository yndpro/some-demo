
import Mock from './mock-min';
var domain = "http://localhost:3030/cn/xxtjd/dts";


Mock.mock('http://-ajaxGetPrize', {
    "status":"1",
    "msg":"领取成功",
    "data":{
        "prizeName":"礼包1111111",
        "score":0,
        "prizeDisabled":"1",
        "code":"301362655_4"
    }
});

Mock.mock('http://-ajaxSignIn', {
    "status":1,
    "msg":"签到成功",
    "data":{
        "num":3,
        "n":"10",
        "j":"2"
    }
});

Mock.mock(domain + '-ajaxInitBx', {
    "status":1,
    "msg":"游戏盒初始化",
    "data":{
        "uid":301362655,
        "nick":"4399厦门充值测试",
        "pageInfo":{
            "isShare":false,
            "score":30,
            "dhPrize":[
                {
                    "code":"301362655_8",
                    "p_name":"10积分礼包",
                    "pid":8,
                    "img":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    "detail":"内容内容内容|内容内容内容|内容内容内容|内容内容内容"
                },
                {
                    "code":"",
                    "p_name":"20积分礼包",
                    "pid":3,
                    "img":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    "detail":"内容内容内容|内容内容内容|内容内容内容|内容内容内容"
                },
                {
                    "code":"",
                    "p_name":"50积分礼包",
                    "pid":5,
                    "img":"//fs.img4399.com/images~2018/09/21/14_V1dW0cZH1M.397x79.jpg",
                    "detail":"内容内容内容|内容内容内容|内容内容内容|内容内容内容"
                }
            ],
            "lastTimes":0
        },
        "zbStatus":{
            "status":1,
            "headTit":"赛事直播",
            "freshBlank":1000,
            "id":"1",
            "tit":"八强赛",
            "start":"20180926 13:50",
            "end":"20180929 18:00",
            "yp":"http://mapi.4399youpai.com/live/detail/frame/485938.html?source=dj&ishowgift=0&ishowchat=0&iswidauto=1",
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

Mock.mock('http://-ajaxGetZbList', {
    "status":1,
    "msg":"直播信息",
    "data":{
        "uid":301362655,
        "lastTimes":5,
        "nick":"4399厦门充值测试",
        "zbStatus":{
            "status":-5,
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

Mock.mock('http://-ajaxOpenBx', {
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

Mock.mock('http://-ajaxWriteUserInfo', {
    "status":1,
    "msg":"报名成功",
    "data":{}
});

Mock.mock('http://ajaxWriteDhUserInfo', {
    "status":1,
    "msg":"报名成功22",
    "data":{}
});

Mock.mock('http://ajaxVote.cn', {
    "status":1,
    "msg":"投票成功",
    "data":{
        "por1":"60",
        "por2":"40"
    }
});



Mock.mock('http://-ajaxLottery', {
    "status":1,
    "msg":"抽奖成功",
    "data":{
        "prizeList":[
            {
                "pid":0,
                "prizeName":"20积分",
                "kind":0,
                "code":"301362655_2"
            }
        ],
        "score":20,
        "lastTimes":5,
        "show":1
    }
});


Mock.mock('http://ajaxGetCode.cn', {
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


Mock.mock('http://ajaxOpenBx.cn', {
    "status":1,
    "msg":"领取成功，请及时使用夺宝次数",
    "data":{
        "minutes":"0.1",
        "bxId":23,
        "time":1499750100,
        "flag":"0d95b3c03b237f0e0c61a6c95acc32ca"
    }
});


Mock.mock('http://ajaxExchange.cn', {
    "status":1,
    "msg":"兑换成功！",
    "data":{
        "pid":22222,
        "prizeName":"咸鱼背包",
        "kind":3
    }
});

Mock.mock('http://-ajaxShare', {
    "status":1,
    "msg":"分享成功！",
    "data":{

    }
});

Mock.mock('http://-ajaxGetRoleName', {
    "status":1,
    "msg":"获取成功！",
    "data":{
        "rolename":"扑街111"
    }
});

Mock.mock('http://-ajaxGetTaskInfo', {
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




Mock.mock('http://-ajaxGetMyPrize', {
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







