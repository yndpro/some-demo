/**
 * Created by 4399-1068 on 2017/4/7.
 * 我的奖品模块
 */
;(function(factory) {
    // CMD/SeaJS
    if(typeof define === "function") {
        define(["./m_dialog.js","./Ajax.js","./ClientBox.js","./ClientYoupai.js","./Wap.js"],factory);
    }else if(typeof exports === 'object'){
        factory(require, exports, module);
    }
    // No module loader
    else {
        factory('', window['MODULE'] = window['MODULE'] || {}, '');
    }

}(function(require, exports, module) {

    var PopupView;
    var Ajax;
    var ClientBox;
    var ClientYoupai;
    var Wap;

    if(typeof require === 'function'){
        PopupView = require("./m_dialog.js");
        Ajax = require("./Ajax.js");
        ClientBox = require("./ClientBox.js");
        ClientYoupai = require("./ClientYoupai.js");
        Wap = require("./Wap.js");
    } else {
        PopupView = window.PopupView;
        Ajax = window.Ajax;
        ClientBox = window.ClientBox;
        ClientYoupai = window.ClientYoupai;
        Wap = window.Wap;
    }

    function MyAward(options){

        var defaults = {
            btn:'.j-myaward',
            myawardTmpl:'#myawardTmpl',
            loadingTmpl:'#loadingTmpl',
            dataTmpl:'#myawardDataTmpl',
            nodataTmpl:'#myawardNodataTmpl',
            bodyNode:'.dialog-body',
            listNode:'.myaward-list',
            itemTmpl:'myawardItemTmpl'
        };
        this.options = $.extend(defaults,options);
        this.cache = null;
        this.prizeList = [];

    }

    MyAward.prototype = {

        bind : function(){
            var myaward = this;

            $(this.options.btn).bind("click", function (e) {

                /*判断是否登陆*/
                if(!userInfo.uid || userInfo.uid == 0){
                    if(appInfo.environment == appInfo.WAP){
                        Wap.login();
                    }
                    if(appInfo.environment == appInfo.BOX){
                        ClientBox.login();
                    }
                    if(appInfo.environment == appInfo.YOUPAI){
                        ClientYoupai.login();
                    }
                    return false;
                }

                /*弹出列表模态窗*/
                PopupView.myaward({
                    body_tmpl: $(myaward.options.loadingTmpl).html()
                },function(){
                    /*获取列表数据*/
                    myaward.getListData();
                },function(){

                    /*清楚复制组件内存*/
                    if(myaward.copy){
                        for (var i = 0; i < myaward.copy.length; i++) {
                            if(myaward.copy[i]){
                                myaward.copy[i].close();
                            }
                        }
                        delete myaward.copy
                    }

                    /*解绑事件*/
                    $('.j-myawardWatch').unbind('click');
                });

                return false;
            })
        },

        getListData: function () {
            var myaward = this;

            Ajax.post(myaward.options.urlGetMyPrizes,{_AJAX_:1}, function (result) {

                var _pop = ue.dialog.list["j-myaward_popup"];
                if (_pop) {
                    var $pop = _pop.obj;
                    if (result.status > 0) {
                        /*渲染列表*/
                        myaward.renderList(result.data,1);
                        myaward.prizeList = result.data.prizeList;
                    } else if (result.status == AWARD.NOAWARD_DATA) {
                        /*列表数据为空*/
                        $pop.find(myaward.options.bodyNode).html($(myaward.options.nodataTmpl).html());
                    } else {
                        PopupView.tip(result.msg);
                        _pop.close();
                    }
                    _pop.reset();
                }

            },"json");
        },

        renderList : function(data,page){
            var myaward = this,
                popMyAward = ue.dialog.list["j-myaward_popup"],
                $popMyAward = popMyAward.obj,
                pageCount = Math.ceil(data.prizeList.length / data.perPage);

            /*渲染列表*/
            $popMyAward.find(myaward.options.bodyNode).html($(myaward.options.dataTmpl).html());
            var $list = $(myaward.options.listNode),list = data.prizeList.slice((page - 1) * data.perPage,page * data.perPage),_html = "";
            for(var i = 0;i < list.length;i++){
                _html += baidu.template(myaward.options.itemTmpl,list[i]);
            }
            $list.html(_html);

            /*渲染分页*/
            ue.pager({
                //target: $pop.find(".list_pager"),//放置分页的元素
                pagerTarget: $popMyAward.find(".dialog-pager"),
                first: '',
                firstDisabled: '',
                last: '',
                lastDisabled: '',
                prev: '<a href="#" class="pager-pre">上一页</a>',
                prevDisabled: '<span style="color:#747474;" class="pager-pre">上一页</span>',
                next: '<a href="#" class="pager-next">下一页</a>',
                nextDisabled: '<span style="color:#747474;" class="pager-next">下一页</span>',
                current: '<span class="cur">@{page}</span>',
                page: '<a href="#">@{page}</a>',
                tip: '<span class="pager-count">@{nowPage}/@{pageCount}</span>',
                goto: '',
                now: page,//当前页
                maxPage: 5,//显示的最多页数
                per: data.perPage,
                pageCount: pageCount,
                onchange: function (page) {//切换页数回调函数
                    myaward.renderList(data,page);
                }
            });

            /*注册列表事件*/
            $('.j-myawardWatch').bind('click',function(e){
                var $this = $(this),
                    _id = $this.closest('li').attr('data-id'),
                    _data = myaward.getPrizeListItem(_id);

                myaward.form(_data,this);
                return false;
            });
            $('.j-myawardGame').bind('click',function(){
                var $this = $(this),
                    _id = $this.closest('li').attr('data-id'),
                    _data = myaward.getPrizeListItem(_id);

                myaward.games(_data,this);
                return false;
            });

            /*注册复制组件*/
            var item;
            for(var i = 0;item = list[i],i < list.length;i++){
                /*myaward.copy = myaward.copy || [];
                if(item.kind == AWARD.GIFT){
                    myaward.copy[i] = ue.copy({
                        btnId: "j-copy-btn" + item.id,
                        txtId: 'j-copy-code' + item.id,
                        container: $popMyAward.find(".dialog-body")[0],
                        success: function () {
                            PopupView.tip("已复制到剪切板，可通过ctrl+v粘贴");
                        }
                    });
                }*/
                /*复制*/
                if(item.kind != 1){
                    continue;
                }
                if(appInfo.environment == appInfo.WAP){
                    Wap.copy("#j-copy-btn" + item.id);
                }
                if(appInfo.environment == appInfo.BOX){
                    $("#j-copy-btn" + item.id).bind("click",function (id){
                        return function(){
                            ClientBox.copy($("#j-copy-code" + id).attr("value"));
                        }
                    }(item.id));
                }
                if(appInfo.environment == appInfo.YOUPAI){
                    $("#j-copy-btn" + item.id).bind("click",function (id){
                        return function(){
                            ClientYoupai.copy($("#j-copy-code" + id).attr("value"));
                        }
                    }(item.id));
                }
            }

        },

        getPrizeListItem : function(id){
            var myaward = this;
            if(myaward.prizeList){
                for(var i = 0;i < myaward.prizeList.length;i++){
                    if(id == myaward.prizeList[i].id) return myaward.prizeList[i];
                }
            }
        },

        form:function(_data,target){
            var myaward = this;
            
            /*弹出表单模态窗*/
            PopupView.form(_data,function(){

                var _pop = this,
                    $pop = this.obj;

                var $form = $(".j-form");
                $(".j-submit").bind("click",function(){

                    /*验证表单处理*/
                    var validate = true;
                    var phoneReg = /^0?(13|14|15|17|18)[0-9]{9}$/;
                    var qqReg = /^[1-9][0-9]{4,11}$/;
                    $form.find("input[type=text]").each(function(){
                        var _$this = $(this);
                        if($.trim(_$this.val())==""){
                            PopupView.tip("请填写完整信息");
                            validate = false;
                            return false;
                        }
                    });


                    if($.trim($form.find("textarea").val())==""){
                        PopupView.tip("请填写完整信息");
                        validate = false;
                        return false;
                    }

                    var phone = $.trim($('input[name=uphone]').val());
                    if(!phoneReg.test(phone)){
                        PopupView.tip("请填写正确的电话号码");
                        validate = false;
                        return false;
                    }

                    /*var qq = $.trim($('input[name=uqq]').val());
                    if(!qqReg.test(qq)){
                        PopupView.tip("请填写正确的QQ号码");
                        validate = false;
                        return false;
                    }*/

                    if(validate){

                        /*提交表单*/
                        Ajax.post(myaward.options.urlWriteUserInfo, $form.serialize() + "&_AJAX_=1", function (result) {
                            if(result.status == 1){
                                _pop.close();
                                PopupView.tip(result.msg);

                                /*更新缓存列表信息*/
                                if(target){
                                    var _arr = $form.serialize().split("&"),_item;
                                    _item = myaward.getPrizeListItem(_arr[0].split("=")[1]);
                                    _item.uinfo = {
                                        uname : decodeURIComponent(_arr[1].split("=")[1]),
                                        uphone: _arr[2].split("=")[1],
                                        uaddress: decodeURIComponent(_arr[3].split("=")[1])
                                    };
                                    $(target).text("【查看，您的收件信息】");
                                }
                            }else{
                                PopupView.tip(result.msg);
                            }

                        }, "json");
                    }

                })

            },function () {
                $(".niudan_hole").find("img")
                    .unbind("load")
                    .attr("src","")
                    .removeClass("niudan-out");
            });
        }

    };

    /*function getInstanceHandle() {
        return function (options) {
            return new MyAward(options);
        };
    }*/

    if( {}.toString.call(module) == '[object Object]' ){
        module.exports = MyAward;
    }else{
        exports.MyAward = MyAward;
    }

}));



