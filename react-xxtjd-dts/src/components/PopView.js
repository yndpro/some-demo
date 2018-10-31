import React from 'react';
import Dialog from './dialog';
import MyAwardPop from './myaward_pop';
import './dialog.scss';

console.log("PopView.js",MyAwardPop);

/*基础弹窗*/
const popup = function (name, data, afterInit, afterClose) {
    let pview = this;

    let content = <div className={`dialog dialog--${name}`}>
                <a href="javascript:;" className="dialog-close">×</a>
                <div className="dialog-hd"></div>
                <div className="dialog-body">
                    {template[name](data)}
                </div>
                <div className="dialog-fd"></div>
            </div>

    return new Dialog({
        id: "j-" + name + "_popup",
        content: content,    
        afterInit: function () {
            document.querySelector(".dialog-close,.j-confirm,.j-cancel").addEventListener("click",() => {
                this.close();
            },false);
            typeof afterInit === "function" && afterInit.call(this);
        },
        afterClose: function () {
            typeof afterClose === "function" && afterClose.call(this);
        },
    });
};


const template = {
    tip : function({msg}){
        return (
            <div class="dialog-cont">
                <h3 class="dialog-title">{msg}</h3>
            </div>
        )
    },
    
    awardList : function({list}){
        return (
            <div className="dialog-cont">
                <h3 className="dialog-title">奖品详情列表</h3>
                <ul className="awardList-list">
                {
                    list.map(item => <li>{item}</li>)
                }
                </ul>
            </div>
        )
    }, 

    myaward : function({list,perPage}){
        return (
            <MyAwardPop list={list} perPage={perPage}/>
        )
    }, 

    form : function({item}){
        return (
            <div class="dialog-cont dialog-form">
                <div class="dialog-title">收件信息</div>
                <div class="clearfix">
                    <form class="j-form">
                        <div class="form-item form-item1">
                            <label for="" class="form-label">姓名：</label>
                            item.uinfo ? 
                            <input type="text" name="uname" class="form-input" value={uinfo.uname} readonly/>
                            :
                            <input type="text" name="uname" class="form-input"/>
                        </div>
                        <div class="form-item form-item2">
                            <label for="" class="form-label">手机号码：</label>
                            item.uinfo ? 
                            <input type="text" name="uphone" class="form-input" value={uinfo.uphone} readonly/>
                            :
                            <input type="text" name="uphone" class="form-input"/>
                        </div>
                        <div class="form-item form-item3">
                            <label for="" class="form-label">详细的住址：</label>
                            item.uinfo ? 
                            <textarea name="uaddress" class="form-textarea" id="" cols="30" rows="3" readonly>{uinfo.uaddress}</textarea>
                            :
                            <textarea name="uaddress" class="form-textarea" id="" cols="30" rows="3" placeholder="建议您如实填写详细收货地址。列如：省、市、城、镇、区、街道（村）名称、门牌号码、楼层和房间号等信息。"></textarea>
                        </div>
                    </form>
                </div>
                <div class="dialog-tips">（注：信息提交后无法修改，请谨慎填写确保送达）</div>
                <div class="dialog-opt">
                    item.uinfo ? 
                    <a href="javascript:;" class="dialog-btn j-confirm">确定</a>
                    :
                    <input type="submit" class="dialog-btn j-submit" value="确定"/>
                </div>
            </div>
        )
    }, 
        
};


const PopupView =  {

    tip: function (msg) {
        return popup("tip",{msg:msg},function(){
            let _pop = this;

            // $(".ui-dialog-mask").unbind("click");
            setTimeout(function(){
                _pop.close();
            },2000)
        })
    },

    awardList: function (data,afterInit, afterClose) {
        return popup("awardList",data,afterInit,afterClose);
    },

    myaward: function (data,afterInit, afterClose) {
        return popup("myaward",data,afterInit,afterClose);
    },

    form: function (data,afterInit, afterClose) {
        return popup("form",data,afterInit,afterClose);
    }

};

module.exports = PopupView;