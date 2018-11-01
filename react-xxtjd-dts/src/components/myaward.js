import React from 'react';
import Dialog from './dialog';
import PopupView from './PopView';
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
                    PopupView.myaward({
                        list : response.data.prizeList,
                        perPage : response.data.perPage
                    });
                }
            });
    },
    
    componentDidMount : function(){
        Pubsub.subscribe("DIALOG_FORM_OPEN",(msg,item) => {
            PopupView.form({item:item})
        });
        Pubsub.subscribe("DIALOG_FORM_SUBMIT",(msg,item) => {
            
            let validate = true;

            for(let key in item.uinfo){
                if(item.uinfo[key] == ""){ 
                    PopupView.tip("请填写完整信息");
                    validate = false;
                    return false;
                }
            }

            if(!/^0?(13|14|15|17|18)[0-9]{9}$/.test(item.uinfo.uphone)){
                PopupView.tip("请填写正确的电话号码");
                validate = false;
                return false;
            }

            if(validate){
                Ajax.post(ztUrl + '-ajaxWriteUserInfo',{
                    id:item.id,
                    uname:item.uinfo.uname,
                    uphone:item.uinfo.uphone,
                    uaddress:item.uinfo.uaddress
                }).then(response => {
                    if(response.status == 1){
                        PopupView.tip(response.msg);
                        Dialog.list["j-form_popup"].close();
                        Pubsub.publish("MYAWARD_LIST_UPDATE",item);
                        return false
                    }
                    if(response.status < 0){
                        PopupView.tip(response.msg)
                        return false
                    }
                });
            }
            
        });
    },

    componentWillUnmount : function(){
        Pubsub.unsubscribe("DIALOG_FORM_OPEN");
        Pubsub.unsubscribe("DIALOG_FORM_SUBMIT");
    },

    render : function(){
        return (
            <a href="javascript:;" className="" onClick={this.clickHandle}>我的奖励</a>
        )
    }
})

module.exports =  MyAward;