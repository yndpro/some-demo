
var host = "http://api.com";

var strategies = {
	noEmpty: function(value) {
		return value === '' ? false : true
	},
	isMoblie: function(value) {
		if (value == "") return false;

		return !/^0?(13|14|15|17|18)[0-9]{9}$/.test(value) ? false : true;
	},
	reg: function(value, pattern) {
		console.log(eval(pattern).test(value));
		return !eval(pattern).test(value) ? false : true;
	}
};


var ValidateModel = {
    cache : [],
    add : function(dom,rules){
        var _this = this;

        for(var i=0;i < rules.length;i++){
            (function (i){
                var rule = rules[i];
                var strategyArr = rule.strategy.split(':');
                var strategy = strategyArr.shift();
                strategyArr.unshift(dom.value);
                //strategyArr.push(rule.errorMsg);
                _this.cache.push({
                    dom : dom,
                    errorMsg : rule.errorMsg,
                    handle : function(){
                        return strategies[strategy].apply(dom,strategyArr);
                    }
                })
            })(i)
        }
    },
    start : function(){
        for(var i=0;i < this.cache.length;i++){
            if(!this.cache[i].handle()){
                return this.cache[i].errorMsg
            }
        }
    }
}

function transferParamsObj2Query(obj, isPrefix) {
    isPrefix = isPrefix ? isPrefix : false;
    var prefix = isPrefix ? '?' : '';
    var _result = [];
    for (var key in obj) {
        var value = obj[key];
        _result.push(key + '=' + value);
    }
    return _result.length ? prefix + _result.join('&') : ''
}

function inputCheck(dom,error,rules){
    var $error = $(error);
    $error.html('').hide();
    ValidateModel.cache = [];
    ValidateModel.add(dom,rules);
    var errorMsg = ValidateModel.start();
    if(errorMsg){
        $error.html(errorMsg).show();
        return false
    }
    return true
}

function checkBtnAvailable(form){
    var $form = $(form);
    
    if(($form.find('input[name=phone]').length > 0) && ($form.find('input[name=verify]').length > 0)){
        if($form.find(".verifycode").attr("isCounting") === "false"){
            if($form.find('input[name=phone]').val().length >= 11){
                $form.find(".verifycode").removeClass("disable");
            }else{
                $form.find(".verifycode").addClass("disable");
            }
        }
        if(($form.find('input[name=phone]').val().length >= 11) && ($form.find('input[name=verify]').val() != "")){
            $form.find(".btn-primary").removeClass("disable");
        }else{
            $form.find(".btn-primary").addClass("disable");
        }
    }
    if($form.find('input[name=verify]').length > 0){
        if($form.find('input[name=verify]').val() != ""){
            $form.find(".btn-primary").removeClass("disable");
        }else{
            $form.find(".btn-primary").addClass("disable");
        }
    }
}

function countDown(form){
    var $form = $(form);
    var $verifycode = $form.find(".verifycode");
    var _t = 6;
    $verifycode.attr("isCounting","true");
    function countTime(){		
        _t--;
        if( _t<=0 ){
            $verifycode.attr("class","verifycode").html('重新获取');
            $verifycode.attr("isCounting","false");
            checkBtnAvailable(form);
        }else{
            $verifycode.attr("class","verifycode disable").html('已发送（' + _t +'S）');
            setTimeout(arguments.callee,1000);
        }
    }
    setTimeout(countTime,1000);
}

function countDownSendEmail(form) {
    var $form = $(form);
    var $btn = $form.find(".j-send");
    var _t = 6;
    $btn.attr("isCounting", "true");

    function countTime() {
        _t--;
        if (_t <= 0) {
            $btn.attr("class", "btn btn-primary j-send").html('发送验证邮件');
            $btn.attr("isCounting", "false");
        } else {
            $btn.attr("class", "btn btn-primary disable").html(_t + 's后重新发送');
            setTimeout(arguments.callee, 1000);
        }
    }
    setTimeout(countTime, 1000);
}

var timer = {};

function checkMailStatus(type) {
	var params = {
		_c: "verify",
		_a: "check",
		type: type
	}
	$.getJSON(host + '/anquan/safe/?' + transferParamsObj2Query(params), function(res) {
		if (res.data != '0') {
			timer[type] && clearTimeout(timer[type]);
			//验证通过
			alert('邮件验证通过 弹实名');
		} else {
			//还未验证 继续定时检查
			timer[type] = setTimeout("checkMailStatus(" + type + ")", 1000);
		}
	});
}

function checkPhoneBind(type) {
	var params = {
		_a: "userInfo",
		field: type
	}
	$.getJSON(host + '/anquan/safe/?' + transferParamsObj2Query(params), function(res) {
		if (res.data) {
			timer[type] && clearTimeout(timer[type]);
			//验证通过
			alert('手机验证通过 弹实名');
		} else {
			//还未验证 继续定时检查
			timer[type] = setTimeout("checkPhoneBind('phone')", 1000);
		}
	});
}

function evokeSMS(dom,content) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isAndroid == true){
        $(dom).attr("href","sms:?body="+content);
    }
    else if(isIos == true){
        $(dom).attr("href","sms:&body="+content);
    }
}

function toast(content) {
    var _timer;
    var _node = document.createElement("div");
    _node.className = 'u-toast';
    _node.innerHTML = content;
    document.body.appendChild(_node);
    clearTimeout(_timer);
    _timer = setTimeout(function(){
        document.body.removeChild(_node)
    },3000)
}

function bind() {

    $(document).find('.u-tab li').bind('click',function(){
        var index = $(this).index();
        $(this).addClass("cur").siblings().removeClass("cur");
        $(document).find('.u-tab .tab-cont').eq(index).show().siblings().hide();
    })
    $(document).on('click','.j-dialog-close',function(){
        $(document).find('#j-limitSms-dialog').hide();
    });
    
    var forms = [
        $(document).find(".u-form[name='pwd']")[0],
        $(document).find(".u-form[name='phone']")[0],
        $(document).find(".u-form[name='question']")[0],
        $(document).find(".u-form[name='email']")[0],
        $(document).find(".u-form[name='qq']")[0]
    ]
    
    $.each(forms,function(j,form) {
        
        if(!form) return true;
        var $form = $(form);
        var globalInvalidFeedback = $form.find(".j-global-invalid-feedback");
        var $error = $form.find(".invalid-feedback");
        
        if (form.name == "phone") {
            //手机号输入框
            $form.find('input[name=phone]').bind('input propertychange',function(){
                
                this.value = this.value.replace(/[^\d]/g,'');
                this.value = this.value.slice(0,11);
                
                if(this.value == ""){
                    $(this).closest(".form-group").find(".form-clear").hide()
                }else{
                    $(this).closest(".form-group").find(".form-clear").show()
                }
                
                checkBtnAvailable(form);
                inputCheck(this,globalInvalidFeedback,[{
                    strategy: 'noEmpty',errorMsg: '手机号不能为空'
                },{
                    strategy: 'isMoblie',errorMsg: '请输入正确手机号'
                }]);
            });

            //验证码输入框
            $form.find('input[name=code]').bind('input propertychange', function() {
                this.value = this.value.slice(0, 6);

                checkBtnAvailable(form);
                inputCheck(this,globalInvalidFeedback,[{
                    strategy: 'noEmpty',
                    errorMsg: '验证码不能为空'
                }]);
            })
        }

        if (form.name == "pwd") {

            //输入密码
            $form.find('input[name=code]').bind('input propertychange', function() {

                if ($form.find('input[name=code]').val() != "") {
                    $form.find(".btn-primary").removeClass("disable");
                } else {
                    $form.find(".btn-primary").addClass("disable");
                }
                inputCheck(this,globalInvalidFeedback,[{
                    strategy: 'noEmpty',
                    errorMsg: '密码不能为空'
                }]);
            })
        }
    
        $form.find('.form-clear').bind('click',function(){
            $(this).closest(".form-group").find("input[type=text]").val("").trigger("input");
            return false
        })
    
        //验证码输入框
        $form.find('input[name=verify]').bind('input propertychange',function(){
            this.value = this.value.slice(0,6);
    
            checkBtnAvailable(form);
            if($form.find('input[name=phone]').length > 0){
                if(!inputCheck($form.find('input[name=phone]')[0],globalInvalidFeedback,[{
                    strategy: 'noEmpty',errorMsg: '手机号不能为空'
                },{
                    strategy: 'isMoblie',errorMsg: '请输入正确手机号'
                }])){
                    return false
                };
            }
            inputCheck(this,globalInvalidFeedback,[{
                strategy: 'noEmpty',errorMsg: '验证码不能为空'
            }]);
            
        })
    
        //获取验证码
        $form.find(".verifycode").bind('click',function(){
            if($(this).hasClass("disable")){
                return false
            }
            if($form.find('input[name=phone]').length > 0){
                if(!inputCheck($form.find('input[name=phone]')[0],globalInvalidFeedback,[{
                    strategy: 'noEmpty',errorMsg: '手机号不能为空'
                },{
                    strategy: 'isMoblie',errorMsg: '请输入正确手机号'
                }])){
                    return false
                };
            }
            var params = {
                _c: "verify",
                _a: "send",
                type: "phone",
                phone: $.trim($form.find('input[name=phone]')[0].value),
                jsoncallback: ""
            }
            $.getJSON(host + "/anquan/safe/?" + transferParamsObj2Query(params), function(res) {
                if (res.status) {
                    countDown(form);
                } else {
                    globalInvalidFeedback.html(res.msg).show()
                }
            });
        })

        //密保问题输入框
        for (var i = 1; i <= 3; i++) {
            $form.find('input[name=answer' + i + ']').bind('input propertychange',function(){
                
                inputCheck(this,globalInvalidFeedback,[{
                    strategy: 'noEmpty',
                    errorMsg: '密保问题不能为空'
                }, {
                    strategy: 'reg:' + $(this).attr("data-reg"),
                    errorMsg: $(this).attr("data-errormsg")
                }]);
            })
        }
    
        //提交表单
        $form.find('.j-submit').bind('click',function(e){
    
            if($(this).hasClass("disable")){
                return false
            }
            var type = form.name;
            var params = {
                _c: "verify",
                _a: "confirm",
                type: type
            }
    
            $error.html('').hide();
            ValidateModel.cache = [];
            
            if (type == "pwd") {}
            if (type == "phone") {}
            if (type == "question"){
                // for (var i = 1; i <= 3; i++) {
                //     var _dom = $form.find('input[name=answer' + i + ']')[0];
                //     ValidateModel.add(_dom, [{
                //         strategy: 'noEmpty',
                //         errorMsg: '密保问题不能为空'
                //     }, {
                //         strategy: 'reg:' + $(_dom).attr("data-reg"),
                //         errorMsg: $(_dom).attr("data-errormsg")
                //     }]);
                // }
            }
    
            var errorMsg = ValidateModel.start();
            if (errorMsg) {
                $error.html(errorMsg).show();
                return false;
            }
            
            $.post(host + '/anquan/safe/?' + transferParamsObj2Query(params),{serialize: $form.serialize()},function(res) {
                if (res.status) {
                    if(type == "pwd"){
                        var params = {
                            _a: "loadPhoneInfo",
                            jsoncallback: ""
                        }
                        $.getJSON(host + '/anquan/safe/?' + transferParamsObj2Query(params),function(res) {
                            if (res.status) {
                                $("#j-bind-phone").html(res.data.phone);
                                $("#j-bind-bindingCode").html(res.data.bindingCode)
                                $(".step-1").hide();
                                $(".step-2").show();
                            } else {
                                $error.html(res.msg).show()
                            }
                        })
                    }else{
                        alert("实名")
                    }
                } else {
                    $error.html(res.msg).show()
                }
            }, 'json')
            return false;
        })

        //发送验证邮件
        $form.find('.j-send').bind('click', function(e) {
            if ($(this).hasClass("disable")) {
                return false
            }
            var params = {
                _c: "verify",
                _a: "send",
                type: form.name,
                jsoncallback: ""
            }

            $error.html('').hide();
            $.getJSON(host + '/anquan/safe/?' + transferParamsObj2Query(params), function(res) {
                if (res.status) {
                    toast("<div class=\"toast-tit\"><i class=\"icon-check\"></i>发送成功</div>" +
                            "<div class=\"toast-txt\">请立即前往邮箱验证</div>"
                    )
                    countDownSendEmail(form);
                    checkMailStatus(form.name);
                } else {
                    alert(res.msg)
                }
            })
            return false;
        })

        //调起手机短信
        $('.j-sms').bind('click',function(e){
            checkPhoneBind("phone");
            evokeSMS(this,"");
        })
    })
}

(function verify() {
	var params = {
		_c: "verify",
		_a: "userInfo"
	}
	$.getJSON(host + '/anquan/safe/?' + transferParamsObj2Query(params), function(res) {
		if (res.status) {
            $('body').html(baidu.template('securityTmpl', {userInfo: res.data}));
            bind();
		} else {
			alert(res.msg);
		}
	})
})();