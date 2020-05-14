var host = "http://api.com";
        
var strategies = {
    noEmpty :function(value) {
        return value === '' ?
            false : true
    },
    isMoblie :function(value) {
        if(value == "")
            return false;

        return !/^0?(13|14|15|17|18)[0-9]{9}$/.test(value) ?
            false : true;
    },
    reg : function(value,pattern) {
        console.log(eval(pattern).test(value));
        return !eval(pattern).test(value) ?
            false : true;
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
function transferParamsObj2Query(obj,isPrefix) {
    isPrefix = isPrefix ? isPrefix : false;
    var prefix = isPrefix ? '?' : '';
    var _result = [];
    for (var key in obj) {
        var value = obj[key];
        _result.push(key + '=' + value);
    }
    return _result.length ? prefix + _result.join('&') : ''
}

function inputCheck(dom,rules){
    var $error = $(dom).closest(".u-form").find(".invalid-feedback");
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
    
    if(($form.find('input[name=phone]').length > 0) && ($form.find('input[name=code]').length > 0)){
        if($form.find(".verifycode").attr("isCounting") === "false"){
            if($form.find('input[name=phone]').val().length >= 11){
                $form.find(".verifycode").removeClass("disable");
            }else{
                $form.find(".verifycode").addClass("disable");
            }
        }
        if(($form.find('input[name=phone]').val().length >= 11) && ($form.find('input[name=code]').val() != "")){
            $form.find(".btn-primary").removeClass("disable");
        }else{
            $form.find(".btn-primary").addClass("disable");
        }
    }
    // if($form.find('input[name=code]').length > 0){
    //     if($form.find('input[name=code]').val() != ""){
    //         $form.find(".btn-primary").removeClass("disable");
    //     }else{
    //         $form.find(".btn-primary").addClass("disable");
    //     }
    // }
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

function countDownSendEmail(form){
    var $form = $(form);
    var $btn = $form.find(".j-send");
    var _t = 6;
    $btn.attr("isCounting","true");
    function countTime(){		
        _t--;
        if( _t<=0 ){
            $btn.attr("class","btn btn-primary j-send").html('发送验证邮件');
            $btn.attr("isCounting","false");
        }else{
            $btn.attr("class","btn btn-primary disable").html(_t +'s后重新发送');
            setTimeout(arguments.callee,1000);
        }
    }
    setTimeout(countTime,1000);
}


function checkMailStatus(type) {
    var params = {
        _c : "verify",
        _a : "check",
        type : type
    }
    $.getJSON(host + '/anquan/safe/?' + transferParamsObj2Query(params), function (res) {
        if (res.data != '0') {
            //验证通过
            alert('邮件验证通过');
        } else {
            //还未验证 继续定时检查
            checkMailStatus(type);
        }
    });
}

function showPop(data) {
    ue.dialog({
        id: "j-security_popup",
        content: baidu.template('securityTmpl',data),
        lock: true,
        force: true,
        drag : true,
        closeBtn: ".dialog-close",
        init: function () {
            var _pop = this,
                $pop = this.obj;

            $pop.on('click','.dialog-close',function(){
                _pop.close();
            });
            $pop.on('click','.layer-close',function(){
                $pop.find('.dialog-layer').hide();
            });
            $pop.find('.u-tab li').bind('click',function(){
                var index = $(this).index();
                $(this).addClass("cur").siblings().removeClass("cur");
                $pop.find('.u-tab .tab-cont').eq(index).show().siblings().hide();
            })
            
        
            var forms = [
                $pop.find(".u-form[name='bind']")[0],
                $pop.find(".u-form[name='phone']")[0],
                $pop.find(".u-form[name='question']")[0],
                $pop.find(".u-form[name='email']")[0],
                $pop.find(".u-form[name='qq']")[0]
            ]

            $.each(forms,function(j,form) {
                if(!form) return true;
                var $form = $(form);
                var $error = $form.find(".invalid-feedback");
                    

                //手机号输入框
                $form.find('input[name=phone]').bind('input propertychange',function(){
                    
                    this.value = this.value.replace(/[^\d]/g,'');
                    this.value = this.value.slice(0,11);
                    
                    checkBtnAvailable(form);
                    inputCheck(this,[{
                        strategy: 'noEmpty',errorMsg: '手机号不能为空'
                    },{
                        strategy: 'isMoblie',errorMsg: '请输入正确手机号'
                    }]);
                });

                //验证码输入框
                $form.find('input[name=code]').bind('input propertychange',function(){
                    this.value = this.value.slice(0,6);

                    checkBtnAvailable(form);
                    inputCheck(this,[{
                        strategy: 'noEmpty',errorMsg: '验证码不能为空'
                    }]);
                })

                //获取验证码
                $form.find(".verifycode").bind('click',function(){
                    if($(this).hasClass("disable")){
                        return false
                    }
                    if($form.find('input[name=phone]').length > 0){
                        if(!inputCheck($form.find('input[name=phone]')[0],[{
                            strategy: 'noEmpty',errorMsg: '手机号不能为空'
                        },{
                            strategy: 'isMoblie',errorMsg: '请输入正确手机号'
                        }])){
                            return false
                        };
                    }
                    var params = {
                        _c : "verify",
                        _a : "send",
                        type : "phone",
                        phone : $.trim($form.find('input[name=phone]')[0].value),
                        jsoncallback : ""
                    }
                    
                    $.getJSON(host + "/anquan/safe/?" + transferParamsObj2Query(params),function (res) {
                        if(res.status){
                            countDown(form);
                        }else{
                            $(".invalid-feedback").html(res.msg).show()
                        }
                    });
                })

                //密保问题输入框
                for (var i = 1; i <= 3; i++) {
                    $form.find('input[name=answer' + i + ']').bind('input propertychange',function(){
                        inputCheck(this,[{
                            strategy: 'noEmpty',errorMsg: '密保问题不能为空'
                        },{
                            strategy: 'reg:' + $(this).attr("data-reg"),errorMsg: $(this).attr("data-errormsg")
                        }]);
                        
                    })
                }

                //提交表单
                $form.find('.j-submit').bind('click',function(e){

                    if($(this).hasClass("disable")){
                        return false
                    }
                    var params = {
                        _c : "verify",
                        _a : "confirm",
                        type : form.name
                    }
                    
                    $error.html('').hide();
                    ValidateModel.cache = [];
                    
                    if(form.name == "phone"){}
                    if(form.name == "email"){}
                    if(form.name == "qq"){}
                    if(form.name == "question"){
                        for (var i = 1; i <= 3; i++) {
                            var _dom = $form.find('input[name=answer' + i + ']')[0];
                            ValidateModel.add(_dom,[{
                                strategy: 'noEmpty',errorMsg: '密保问题不能为空'
                            },{
                                strategy: 'reg:' + $(_dom).attr("data-reg"),errorMsg: $(_dom).attr("data-errormsg")
                            }]);
                        }
                    }
                    
                    var errorMsg = ValidateModel.start();
                    if(errorMsg){
                        $error.html(errorMsg).show();
                        return false;
                    }

                    $.post(host + '/anquan/safe/?' + transferParamsObj2Query(params) + "&" + $form.serialize(), function (res) {
                        if(res.status){
                            _pop.close();
                            alert("实名")
                        }else{
                            $error.html(res.msg).show()
                        }
                    },'json')
                    return false;
                })

                //提交表单
                $form.find('.j-send').bind('click',function(e){
                    if($(this).hasClass("disable")){
                        return false
                    }
                    var params = {
                        _c : "verify",
                        _a : "send",
                        type : form.name,
                        jsoncallback : ""
                    }
                
                    $error.html('').hide();
                    $.getJSON(host + '/anquan/safe/?' + transferParamsObj2Query(params), function (res) {
                        if(res.status){
                            countDownSendEmail(form);
                        }else{
                            alert(res.msg)
                        }
                    })
                    return false;
                })
            })
        
        },
        afterClose: function() {
            
        }
    });
}
$(document).on("click","#trigger",function(params) {
    var params = {
        _c : "verify",
        _a : "userInfo"
    }
    $.getJSON(host + '/anquan/safe/?' + transferParamsObj2Query(params), function (res) {
        if(res.status){
            showPop({userInfo:res.data})
        }else{
            alert(res.msg);
        }
    })

})