import React from 'react';
import Pubsub from 'pubsub-js';
import API from '../assets/js/api';
import {PopupView} from './PopView';
import DialogGiftCode from './dialog_giftCode';
import './lotteryTurntable.scss';

var Lottery = {
    start : function(){

    },
    stop : function(index,callback){
        typeof callback === "function" && callback();
    }
}

var LotteryTurntable = React.createClass({
    start : function(){
    
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
                Lottery.stop(index, () => {
                    this.resolve(response);
                });
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
            Pubsub.publish("UPDATE_LASTTIMES",result.data.lastTimes);
            this.showPop(result.data.prizeList[0]);
            return false;
        }
    },
    showPop : function(item){
        if (item.kind == CONFIG.GIFT) {
            PopupView.giftCode(<DialogGiftCode code={prize.code} name={prize.name}/>,null,function(){
                window._copy.destroy();
                window._copy = null;
            });
        }
        if(item.kind == CONFIG.UNNEED_UINFO){
            PopupView.giftNormal(item)
        }
        if (item.kind == CONFIG.NEED_UINFO) {
            item.fst = 1;
            Pubsub.publish("DIALOG_FORM_OPEN",item);
        }
        if (item.kind == CONFIG.COLLECTIONS) {
            //TODO:
        }
    },
    render : function(){
        let {prizes = [],lastTimes} = this.props;
        return (
            <div className="lottery">
                <ul className="lotte-table">
                {
                    prizes.map((item,index) => 
                        <li key={index} className={`item${index}`}>
                            <div className="item-img"><img alt={item.name} src={item.pic} /></div>
                            <div className="item-txt">{item.name}</div>
                        </li>
                    )
                }
                </ul>
                <div className="lotte-oper">
                    <a href="javascript:;" className="lotte-start" onClick={this.start}>
                        <span className="lotte-remain">（剩余次数：<span>{lastTimes}</span>）</span>
                    </a>
                </div>
            </div>
        )
    }
})

module.exports = LotteryTurntable;