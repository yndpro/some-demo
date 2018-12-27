import React from 'react';
import Pubsub from 'pubsub-js';
import API from '../assets/js/api';
import {PopupView} from './PopView';
import DialogGiftCode from './dialog_giftCode';
import './lotteryTurntable.scss';

var LotteryTurntable = React.createClass({
    start : function(){
    
        if(this.local.rotating){
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
            Pubsub.publish("UPDATE_LASTTIMES",result.data.lastTimes);
            this.setRotate(index,() => {
                this.showPop(result.data.prizeList[0]);
            });
            return false;
        }
    },
    showPop : function(prize){
        console.log(prize)
        if (prize.kind == CONFIG.GIFT) {
            PopupView.giftCode(<DialogGiftCode code={prize.code} name={prize.prizeName}/>,null,function(){
                window._copy.destroy();
                window._copy = null;
            });
        }
        if(prize.kind == CONFIG.UNNEED_UINFO){
            PopupView.giftNormal(prize)
        }
        if (prize.kind == CONFIG.NEED_UINFO) {
            prize.fst = 1;
            Pubsub.publish("DIALOG_FORM_OPEN",prize);
        }
        if (prize.kind == CONFIG.COLLECTIONS) {
            //TODO:
        }
    },
    local : {
        second : 6,
        angle : 0,
        defaultTurn : 5,
        orientation : 1,
        rotating : false
    },
    setRotate : function(index,callback){
        let {angle,defaultTurn,orientation,second} = this.local;
        let realAngle = orientation == 1 ? (360 -  angle * index) : (angle * index);
        let rotate =  this.props.rotate - (this.props.rotate % 360) + (orientation * (defaultTurn * 360 + realAngle));
        this.local.rotating = true;
        Pubsub.publish("UPDATE_LOTTERY_ROTATE",rotate);
        setTimeout(function(){
            this.local.rotating = false;
            typeof callback === "function" && callback();
        }.bind(this),(second + 1) * 1000)
    },
    componentWillMount : function(){
        let {prizes} = this.props;
        this.local.angle = 360 / prizes.length;
    },
    render : function(){
        let {prizes,lastTimes,rotate} = this.props;
            
        return (
            <div className="lottery">
                <ul className="lotte-table" style={{transform:`rotate(${rotate}deg)`}}>
                {
                    prizes.map((item,index) => 
                        <li key={index} style={{transform:`rotate(${this.local.angle * index}deg)`}}>
                            <div className="item-img"><img alt={item.name} src={item.pic} /></div>
                            <div className="item-txt">{item.name}</div>
                        </li>
                    )
                }
                </ul>
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

module.exports = LotteryTurntable;