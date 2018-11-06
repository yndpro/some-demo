import React from 'react';
import {PopupView} from './PopView';
import DialogGiftCode from './dialog_giftCode';

var ExchangeItem = React.createClass({
    getInitialState : function(){
        return {
            code : this.props.item.code,
            name : this.props.item.p_name,
            pid : this.props.item.pid,
            img : this.props.item.img,
            detail : this.props.item.detail,
            integral : /^\d{2}/.exec(this.props.item.p_name)
        }
    },

    exchangeHandle : function(){
        let {integral,name,code} = this.state;
        let _this = this;
    
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

        if(code){
            this.resolve({status:2,data:{prizeName : name, code : code}});
            return false;
        }
        console.log(this.props.integral,integral);

        if(this.props.integral < integral){
            PopupView.confirm({
                'title':'您的积分不足，无法兑换该礼包',
                'text':'（您可在赛事直播期间，进行夺宝抽奖获得礼包兑换积分！）',
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
        let _this = this;
        Ajax.post(ztUrl + "-ajaxGetPrize", {pid:this.state.pid})
            .then(response => {
                _this.resolve(response);
            },"json");
    },

    resolve : function(result){
        
        let {integral,name,code} = this.state;

        var _this = this;
        
        if (result.status == CONFIG.UNLOGIN) {

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

        if (result.status == CONFIG.NOTSTART) {
            PopupView.tip("活动未开始");
            return false;
        }

        if (result.status == CONFIG.GAMEOVER) {
            PopupView.tip("已结束");
            return false;
        }

        if(result.status < 0){
            PopupView.tip(result.msg);
            return false;
        }

        if(result.status > 0){
            this.setState({
                code : result.data.code,
                name : result.data.prizeName
            })
            PopupView.giftCode(<DialogGiftCode code={this.state.code} name={this.state.name}/>);
            return false;
        }
    },

    detailHandle : function(){
        PopupView.awardList({list : this.props.item.detail.split("|")});
    },
    
    render : function(){
        let {integral,img,detail,code} = this.state;
        return (
            <li className="lbdh-item">
                <a href="javascript:;" className="item-cover" onClick={this.detailHandle}>
                    <p className="item-int">{integral}积分</p>
                    <img className="item-img" src={img} alt=""/>
                    <p className="item-more" data-detail={detail}>查看详情</p>
                </a>
                {
                    code ? 
                    <a href="javascript:;" className="item-dh geted" onClick={this.exchangeHandle}></a>
                    :
                    <a href="javascript:;" className="item-dh" onClick={this.exchangeHandle}></a>
                }
            </li>
        )
    }
})

module.exports = ExchangeItem;