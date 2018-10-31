import React from 'react';
import PopupView from './PopView';
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
        
    },

    render : function(){
        return (
            <a href="javascript:;" className="" onClick={this.clickHandle}>我的奖励</a>
        )
    }
})

module.exports =  MyAward;