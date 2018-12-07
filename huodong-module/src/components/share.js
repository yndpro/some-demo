import React from 'react';
import Pubsub from 'pubsub-js';
import API from '../assets/js/api';
import {PopupView} from './PopView';
import DialogGuessInstr from './dialog_guessInstr';

var Share = React.createClass({

    postShare : function(){
        if(!this.props.isShare){
            Ajax.post(API.postShare,{})
                .then(result => {
                    let {status,data:{point},msg} = result;
                    if(status == 1){
                        Pubsub.publish("UPDATE_INTEGRAL",point);
                        Pubsub.publish("UPDATE_SHARE_STATUS");
                    }else{
                        PopupView.tip(msg);
                    }
                });
        }
    },

    componentDidMount : function(){
        let target = ".j-share-btn";
        if(ztInfo.terminal == CONFIG.YOUPAI){
            document.querySelector(target).addEventListener("click",() => {
                if(!userInfo.uid || userInfo.uid == 0){
                    ClientYoupai.login();
                    return false;
                }
                ClientYoupai.shareCustom({
                    "title" : shareInfo.title,
                    "content" : shareInfo.desc,
                    "iconUrl" : shareInfo.img,
                    "redirectUrl" : shareInfo.url
                });
                this.postShare();
                return false;
            })
        }
        if(ztInfo.terminal == CONFIG.BOX){
            ClientBox.shareCustom({
                "shareTitle": shareInfo.title,
                "shareIcon": shareInfo.img,
                "shareUrl": shareInfo.url,
                "shareContent": shareInfo.desc
            },target,param => {
                if(param.shareResult == 1){
                    this.postShare();
                    return false;
                }
                /*if(param.shareResult == 0){
                    PopupView("分享取消");return false;
                }
                if(param.shareResult == -1){
                    PopupView("分享失败");return false;
                }*/
            });
        }
    },
    
    render : function(){
        return (
            <div className="ssjc-share">
                {ztInfo.terminal == CONFIG.WAP ? "" : <div className="share-instr">成功分享该页面即可获得10积分！<span>（仅限1次）</span></div>}
                <div className="share-oper">
                    {ztInfo.terminal == CONFIG.WAP ? "" : <a href="javascript:;" className="j-share-btn">立即分享</a>}
                    <a href="javascript:;" onClick={() => PopupView.guessInstr(<DialogGuessInstr></DialogGuessInstr>)}>竞猜说明</a>
                </div>
            </div>
        )
    }
})

module.exports = Share;