
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
    var field = getQueryString(options.url,'field');
    if(_a == "userInfo"){
        if(field == "phone"){
            var re = Math.round(Math.random());
            return {
                data: re //0-未验证 1-验证通过
            } 
        }else{
            return {
                "status": true, //当status=false时 解析报错信息
                "data": {//为空表示没有设置密保
                    // "phone": {
                    //     "name": "绑定手机",
                    //     "data": "1805****767"
                    // },
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
            //return {data: null, status: true}
        }
    }else if(_a == "send"){
        if(type == "qq"){
            return {
                status: true,
                sender: "xxxx@qq.com",
                error: "",
                jump: "",
                msg: "注意：如果在您的收件箱中没有查看到邮件，请查看一下垃圾邮件处。",
                extend: []
            }
        }else if(type == "email"){
            return {msg: "发送速度过快，请x秒后重试", status:true, extend:["","发送速度过快，请x秒后重试"]}
        }else{
            return {
                "status":true
            }
        }
    }else if(_a == "check"){
        var re = Math.round(Math.random());
        console.log(re);
        return {
            data: re //0-未验证 1-验证通过
        } 
    }else if(_a == "loadPhoneInfo"){
        return {status:true, data:{phone: "1069 0929 4399 1 ", bindingCode: "233427"}}
    }

})
Mock.mock(RegExp(url + '.*'),'post', function(options) {
    var _a = getQueryString(options.url,'_a');
    var type = getQueryString(options.url,'type');
    
    if(_a == "confirm"){
        
        if(type == "phone"){
            return {
                msg: "验证码错误，请重新输入",
                status: false,
                extend: ""
            }
        }else if(type == "pwd"){
            return {status: true, jump: ""}
        }else{
            return {
                msg: "验证码错误，请重新输入密保问题回答不正确",
                status: false,
                extend: ""
            }
        }
    }

})
