import React from 'react';
import Dialog from './dialog';
import DialogMyAward from './dialog_myaward';
import DialogForm from './dialog_form';
import './dialog.scss';

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
            <div className="dialog-cont">
                <h3 className="dialog-title">奖品详情列表</h3>
                <DialogMyAward list={list} perPage={perPage}/>
            </div>
        )
    }, 

    form : function({item}){
        return (
            <div className="dialog-cont dialog-form">
                <div className="dialog-title">收件信息</div>
                <DialogForm item={item}/>
            </div>
        )
    }, 
        
};

module.exports = PopupView;