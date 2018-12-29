import React from 'react';
import Pubsub from 'pubsub-js';
import API from '../assets/js/api';
import {PopupView} from './PopView';
import DialogGiftCode from './dialog_giftCode';
import DialogGiftNormal from './dialog_giftNormal';
import Turntable from './turntable';

var Lottery = React.createClass({

    local : {
        islottering : false
    },

    start : function(){
    
        if(this.local.islottering){
            return false;
        }
    
        if(!userInfo.uid || userInfo.uid == 0){
            this.resolve({status:CONFIG.UNLOGIN});
            return false;
        }
        
        if(ztInfo.status == CONFIG.NOTSTART){
            this.resolve({status:CONFIG.NOTSTART});
            return false;
        }
        
        if(ztInfo.status == CONFIG.GAMEOVER){
            this.resolve({status:CONFIG.GAMEOVER});
            return false;
        }

        if(parseInt(this.props.lastTimes) < 0){
            this.resolve({status:CONFIG.NOCHANCE});
            return false;
        }
        this.getLottery();
    },
    getLottery : function(){
        Ajax.post(API.getLottery, {})
            .then(response => {
                this.resolve(response);
            });
    },
    resolve : function(result){
        
        if (result.status == CONFIG.UNLOGIN) {

            if(ztInfo.terminal == CONFIG.WAP){
                Wap.login();
            }
            if(ztInfo.terminal == CONFIG.BOX){
                ClientBox.login();
            }
            if(ztInfo.terminal == CONFIG.YOUPAI){
                ClientYoupai.login();
            }
            return false;
        }

        if (result.status == CONFIG.NOTSTART) {
            PopupView.tip("活动未开始");
            return false;
        }

        if (result.status == CONFIG.GAMEOVER) {
            PopupView.tip("活动已结束");
            return false;
        }

        if (result.status == CONFIG.NOCHANCE) {
            PopupView.confirm({
                'title':'次数不足，无法夺宝！',
                'text':'（观看直播、分享专题即可获得夺宝次数，详细规则留意夺宝说明）',
                'btnList':['confirm']
            });
            return false;
        }

        if(result.status < 0){
            PopupView.tip(result.msg);
            return false;
        }

        if(result.status > 0){
            let index = this.props.prizes.findIndex(item => item.pid == result.data.prizeList[0].pid);
            this.prizeGot = result.data.prizeList[0];
            Pubsub.publish("UPDATE_LASTTIMES",result.data.lastTimes);
            Pubsub.publish("UPDATE_LOTTERY_INDEX",index);
            Pubsub.publish("LOTTERY_START");
            this.local.islottering = true;
            return false;
        }
    },
    showPop : function(prize){
        if (prize.kind == CONFIG.GIFT) {
            PopupView.giftCode(<DialogGiftCode name={prize.prizeName} code={prize.code} />,null,function(){
                window._copy.destroy();
                window._copy = null;
            });
        }
        if(prize.kind == CONFIG.UNNEED_UINFO){
            PopupView.giftNormal(<DialogGiftNormal name={prize.prizeName}/>)
        }
        if (prize.kind == CONFIG.NEED_UINFO) {
            prize.fst = 1;
            Pubsub.publish("DIALOG_FORM_OPEN",prize);
        }
        if (prize.kind == CONFIG.COLLECTIONS) {
            //TODO:
        }
    },
    componentDidMount : function(){
        Pubsub.subscribe("LOTTERY_STOP",(msg) => {
            this.local.islottering = false;
            this.showPop(this.prizeGot);
        });
    },
    componentWillUnmount : function(){
        Pubsub.unsubscribe("LOTTERY_STOP");
    },
    render : function(){
        let {prizes,lastTimes,index} = this.props;
            
        return (
            <div className="lottery">
                <Turntable prizes={prizes} index={index}></Turntable>
                <div className="lotte-oper">
                    <a href="javascript:;" className="lotte-start" onClick={this.start}>
                        开始
                        <span className="lotte-lastTimes">（剩余次数：<span>{lastTimes}</span>）</span>
                    </a>
                </div>
            </div>
        )
    }
})

module.exports = Lottery;