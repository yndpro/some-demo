import React from 'react';
import Dialog from './dialog';
import './dialog.scss';

/*基础弹窗*/
const popup = function (name, data, afterInit, afterClose) {
    let pview = this;
    
    let content = <div className={`dialog dialog--${name}`}>
                        <a href="javascript:;" className="dialog-close">×</a>
                        <div className="dialog-hd"></div>
                        <div className="dialog-body">
                            {template[name] ? template[name](data) : data}
                        </div>
                        <div className="dialog-fd"></div>
                    </div>
    
    return new Dialog({
        id: "j-" + name + "_popup",
        content: content,    
        afterInit: function () {
            document.querySelector("#" + this.options.id).querySelectorAll(".dialog-close,.j-confirm,.j-cancel").forEach(element => {
                element.addEventListener("click",() => {
                    this.close();
                },false)
            });
            
            typeof afterInit === "function" && afterInit.call(this);
        },
        afterClose: function () {
            typeof afterClose === "function" && afterClose.call(this);
        },
    });
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

    confirm: function (data,afterInit, afterClose) {
        return popup("confirm",data,afterInit,afterClose);
    },

    awardList: function (data,afterInit, afterClose) {
        return popup("awardList",data,afterInit,afterClose);
    },

    myaward: function (data,afterInit, afterClose) {
        return popup("myaward",data,afterInit,afterClose);
    },

    form: function (data,afterInit, afterClose) {
        return popup("form",data,afterInit,afterClose);
    },

    giftCode: function (data,afterInit, afterClose) {
        var _this = this;
        return popup("giftCode",data,afterInit,afterClose)
    },

    giftNormal: function (data,afterInit, afterClose) {
        return popup("giftNormal",data,function(){
            var _pop = this,
                $pop = this.obj;

            typeof afterInit === "function" && afterInit.call(this);

        },afterClose)
    },

    guessResult: function (data,afterInit, afterClose) {
        return popup("guessResult",data,afterInit,afterClose);
    },

    guessInstr: function (data,afterInit, afterClose) {
        return popup("guessInstr",data,afterInit,afterClose);
    }

};


const template = {
    tip : function({msg}){
        return (
            <div className="dialog-cont">
                <h3 className="dialog-title">{msg}</h3>
            </div>
        )
    },

    confirm : function({title,text,btnList}){

        let btns = btnList.map((item,index) => {
            if(item == 'charge'){
                return <a href="" target="_blank" key={index} className="dialog-btn dialog-btn--charge">充值中心</a>
            }else if(item == 'intro'){
                return <a href="javascript:;" key={index} className="dialog-btn">查看活动介绍</a>
            }else if(item == 'confirm'){
                return <a href="javascript:;" key={index} className="dialog-btn dialog-btn--confirm j-confirm">确定</a>
            }else if(item == 'cancel'){
                return <a href="javascript:;" key={index} className="dialog-btn dialog-btn--cancel j-cancel">取消</a>
            }
        })

        return (
            <div className="dialog-cont">
                <h3 className="dialog-title">{title}</h3>
                {text ? <p className="dialog-txt">{text}</p> : null}
                <div className="dialog-opt">
                    {btns}
                </div>
            </div>
        )
    },

    awardList : function({list}){
        return (
            <div className="dialog-cont">
                <h3 className="dialog-title">奖品详情列表</h3>
                <ul className="awardList-list">
                {
                    list.map((item,index) => <li key={index}>{item}</li>)
                }
                </ul>
            </div>
        )
    }
        
};

export {PopupView,template};