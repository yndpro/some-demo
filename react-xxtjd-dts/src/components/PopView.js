import React from 'react';
import Dialog from './dialog';
import MyAwardPop from './myaward_pop';
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
            document.querySelector(".dialog-close").addEventListener("click",() => {
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

    myaward : function({list}){
        return (
            <MyAwardPop list={list} />
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
        return popup("myaward",content,afterInit,afterClose);
    }

};

module.exports = PopupView;