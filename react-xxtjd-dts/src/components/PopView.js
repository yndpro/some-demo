import React from 'react';
import Dialog from './dialog';
import './dialog.scss';

/*基础弹窗*/
const popup = function (name, content, afterInit, afterClose) {
    var pview = this;

    return new Dialog({
        id: "j-" + name + "_popup",
        content: content,
        init: function () {

            var _pop = this,
                $pop = this.obj;

            // $pop.on('click','.j-confirm,.j-cancel',function(){
            //     _pop.close();
            // });
            typeof afterInit === "function" && afterInit.call(this);
        },
        afterClose: afterClose
    });
};



const PopupView =  {

    awardList: function (data,afterInit, afterClose) {
        const id = "awardList";
        const content = 
            <div className="dialog dialog--awardList">
                <a href="javascript:;" className="dialog-close">×</a>
                <div className="dialog-hd"></div>
                <div className="dialog-body">
                    <div className="dialog-cont">
                        <h3 className="dialog-title">奖品详情列表</h3>
                        <ul className="awardList-list"><li></li></ul>
                    </div>
                </div>
                <div className="dialog-fd"></div>
            </div>
            
        return popup(id,content,afterInit,afterClose);
    }

};

module.exports = PopupView;