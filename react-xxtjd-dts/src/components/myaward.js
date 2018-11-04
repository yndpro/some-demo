import React from 'react';
import {PopupView,PopupTemp} from './PopView';
import DialogMyAward from './dialog_myaward';
import DialogForm from './dialog_form';
import Pubsub from 'pubsub-js';
import './dialog.scss';

var MyAward = React.createClass({

    clickHandle : function(){
        
        if(!userInfo.uid || userInfo.uid == 0){
            if(appInfo.environment == CONFIG.WAP){
                Wap.login();
            }
            if(appInfo.environment == CONFIG.BOX){
                ClientBox.login();
            }
            if(appInfo.environment == CONFIG.YOUPAI){
                ClientYoupai.login();
            }
            return false;
        }

        Ajax.post(ztUrl + '-ajaxGetMyPrize',{})
            .then(response => {
                if(response.status == -2){
                    PopupView.confirm({
                        title : "您还未获得任何奖品",
                        text : "请留意下方夺宝规则，获得夺宝次数夺取大奖！",
                        btnList : ["confirm"]
                    })
                    return false
                }
                if(response.status < 0){
                    PopupView.tip(response.msg)
                    return false
                }
                if(response.status == 1){
                    PopupView.myaward(
                        <div className="dialog-cont">
                            <h3 className="dialog-title">奖品详情列表</h3>
                            <DialogMyAward list={response.data.prizeList} perPage={response.data.perPage}/>
                        </div>
                    );
                }
            });
    },
    
    componentDidMount : function(){
        Pubsub.subscribe("DIALOG_FORM_OPEN",(msg,item) => {
            PopupView.form(
                <div className="dialog-cont dialog-form">
                    <div className="dialog-title">收件信息</div>
                    <DialogForm item={item}/>
                </div>
            )
        });
    },

    componentWillUnmount : function(){
        Pubsub.unsubscribe("DIALOG_FORM_OPEN");
    },

    render : function(){
        return (
            <a href="javascript:;" className="" onClick={this.clickHandle}>我的奖励</a>
        )
    }
})

module.exports =  MyAward;