Mock.mock('http://api.com/anquan/safe/?_c=verify&_a=checkVerifyStatus', {
    "status":true
});




Mock.mock('http://api.com/getPhoneVerifyCode', {
    "code":100,
    "result":true, //false 没有，true 有
    "msg":'' //如果出错 code不等于100 这里放错误信息
});

Mock.mock('http://api.com/sendPhoneVerifyCode', {
    "code":100,
    "result":true,
    "msg":''
});

Mock.mock('http://api.com/getSecurityInfo', {
    "code":100,
    "result":{
        "list":{
            "phone": '15215236152',
            "question": '',
            "email": '',
            "qq": '',
        }
    },
    "msg":''
});