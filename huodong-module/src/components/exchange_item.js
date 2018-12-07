import React from 'react';
import Pubsub from 'pubsub-js';
import API from '../assets/js/api';
import {PopupView} from './PopView';
import DialogGiftCode from './dialog_giftCode';
import ReactDOM from 'react-dom';


var ExchangeItem = React.createClass({

    exchangeHandle : function(){
        let {code} = this.props.item,
            integral = this.props.integral,
            _this = this;
        
        if(!userInfo.uid || userInfo.uid == 0){
            this.resolve({status:CONFIG.UNLOGIN});
            return false;
        }

        if(code){
            this.resolve({status:2,data:{code:this.props.item.code,prizeName:this.props.item.p_name}});
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
        
        if(parseInt(this.props.integral) < parseInt(integral)){
            PopupView.confirm({
                'title':'您的积分不足，无法兑换该礼包',
                'text':'（您可参与上方的赛事竞猜，竞猜成功即可获得礼包兑换积分）',
                'btnList':['confirm']
            });
            return false;
        }

        PopupView.confirm({
            'title' : '该礼包需要消耗' + integral + '积分进行兑换',
            'btnList' : ['confirm','cancel']
        },function () {
            document.querySelector(".j-confirm").addEventListener("click",() => {
                _this.getPrize();
            });
        });
    },
    getPrize : function(){
        Ajax.post(API.getPrize, {pid:this.props.item.pid})
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

        if(result.status < 0){
            PopupView.tip(result.msg);
            return false;
        }

        if(result.status > 0){
            if(result.status == 1){
                Pubsub.publish("UPDATE_EXCHANGE_ITEM",{pid:this.props.item.pid,code:result.data.code});
                Pubsub.publish("UPDATE_INTEGRAL",result.data.point);
            }
            PopupView.giftCode(<DialogGiftCode code={result.data.code} name={result.data.prizeName}/>,null,function(){
                window._copy.destroy();
                window._copy = null;
            });
            return false;
        }
    },

    detailHandle : function(){
        PopupView.awardList({list : this.props.item.detail.split("|")});
    },
    
    render : function(){
        let {img,detail,code} = this.props.item,
            integral = this.props.integral;
        return (
            <li className="lbdh-item">
                <a href="javascript:;" className="item-cover" onClick={this.detailHandle}>
                    <p className="item-int">{integral}积分</p>
                    <div className="item-spin">
                        <img className="item-img" src={img} alt=""/>
                        <p className="item-more" data-detail={detail}>查看详情</p>
                    </div>
                </a>
                {
                    code ? 
                    <a href="javascript:;" className="item-dh geted" onClick={this.exchangeHandle}>已兑换(查看)</a>
                    :
                    <a href="javascript:;" className="item-dh" onClick={this.exchangeHandle}>立即兑换</a>
                }
            </li>
        )
    }
})

module.exports = ExchangeItem;