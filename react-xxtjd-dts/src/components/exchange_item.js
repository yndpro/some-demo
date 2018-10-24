import React from 'react';

var ExchangeItem = React.createClass({
    getInitialState : function(){
        console.log(this.props.item);
        return {
            code : this.props.item.code,
            name : this.props.item.p_name,
            pid : this.props.item.pid,
            img : this.props.item.img,
            detail : this.props.item.detail,
            point : /^\d{2}/.exec(this.props.item.p_name)
        }
    },
    exchangeHandle : function(){
        let userInfo = this.props.userInfo;
        let {point,name,code} = this.state;
    

        if(!userInfo.uid || userInfo.uid == 0){
            this.resolve({status:CONFIG.UNLOGIN});
            return false;
        }

        if(!this.resolve({status:CONFIG.actstatus})) {
            return false;
        }

        if(code){
            this.resolve({status:2,data:{prizeName : name, code : code}});
            return false;
        }

        if(userInfo.integral < point){
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
            $('.j-confirm').unbind('click').bind('click',function () {
                this.getPrize();
            });
        });
    },
    getPrize : function(){
        Ajax.post(ztUrl + "-ajaxGetPrize", {pid:this.state.pid},this.state.userInfo)
            .then(response => {
                _this.resolve(response);
            },"json");
    },

    resolve : function(result){
        
        let {point,name,code} = this.state;

        var _this = this;
        
        if (result.status == CONFIG.UNLOGIN) {

            if(appInfo.environment == appInfo.WAP){
                Wap.login();
            }
            if(appInfo.environment == appInfo.BOX){
                ClientBox.login();
            }
            if(appInfo.environment == appInfo.YOUPAI){
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

        if(result.status == CONFIG.START){
            return true;
        }

        if(result.status == -3){
            PopupView.tip(result.msg);
            _this.$target.attr("data-status",result.status);
            return false;
        }

        if(result.status > 0){
            var _data = result.data;

            PopupView.giftCode({ prizeName : _data.prizeName,code : _data.code},function () {
                var _pop = this,
                    $pop = this.obj;

                /*复制*/

                if(appInfo.environment == appInfo.WAP){
                    Wap.copy("#j-copy-btn");
                }
                if(appInfo.environment == appInfo.BOX){
                    $("#j-copy-btn").bind("click",function(){
                        ClientBox.copy($("#j-copy-code").attr("value"));
                    });
                }
                if(appInfo.environment == appInfo.YOUPAI){
                    $("#j-copy-btn").bind("click",function(){
                        ClientYoupai.copy($("#j-copy-code").attr("value"));
                    });
                }


            },function () {
               /* typeof clipboard.destroy === "function" && clipboard.destroy();*/
            });

            if(result.status == 1){
                this.setState(_data);
            }
            return false;
        }
    },
    
    render : function(){
        let {point,img,detail,code} = this.state;
        return (
            <li className="lbdh-item">
                <a href="javascript:;" className="item-cover">
                    <p className="item-int">{point}积分</p>
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