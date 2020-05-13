
function getQueryString(url,name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = url.split("?")[1].match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return undefined;
}

var url = 'http://api.com/anquan/safe/';
Mock.mock(RegExp(url + '.*'),'get', function(options) {
    var _a = getQueryString(options.url,'_a');
    var type = getQueryString(options.url,'type');
    if(_a == "userInfo"){
        return {
            "status": true, //当status=false时 解析报错信息
            "data": {//为空表示没有设置密保
                "phone": {
                    "name": "绑定手机",
                    "data": "1805****767"
                },
                "question": {
                    "name": "密保问题",
                    "data": [
                        [
                            "您的出生地是？", //问题
                            "/^([a-z]{3,38}|[\u4e00-\u9fa5]{2,19})$/i", //答案正则验证
                            "请填写2-19个中文或3-38个英文" //正则验证错误提示文案
                        ],
                        ["您母亲的生日是？", "/^(19|20)\d\d(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/", "请填写日期，如：20120101"],
                        ["您父亲的生日是？", "/^(19|20)\d\d(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/", "请填写日期，如：20120101"]
                    ]
                },
                "email": {
                    "name": "密保邮箱",
                    "data": "*******hW@163.com"
                },
                "qq": {
                    "name": "QQ邮箱",
                    "data": "56****474"
                }
            }
        }
    }else if(_a == "send"){
        return {
            "status":true
        }
    }

})
Mock.mock(RegExp(url + '.*'),'post', function(options) {
    var _a = getQueryString(options.url,'_a');
    var type = getQueryString(options.url,'type');
    
    if(_a == "confirm"){
        if(type == "phone"){
            return {
                "status":true
            }
        }else{
            return {
                "status":true
            }
        }
    }

})
