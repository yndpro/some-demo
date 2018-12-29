import React from 'react';
import Pubsub from 'pubsub-js';
import API from '../assets/js/api';
import {PopupView} from '../components/PopView';
import Mod from '../components/mod';
import Live from '../components/live';
import LiveList from '../components/live_list';
import Exchange from '../components/exchange';
import Award from '../components/award';
import Share from '../components/share';
import Guess from '../components/guess';
import MyAward from '../components/myaward';
import Lottery from '../components/lottery';
import {appDownload} from '../components/download';
import DialogForm from '../components/dialog_form';
import LoadingEllipsis from '../components/loadings-ellipsis';
import WgMod from '../components/wg_mod';
import './app.scss';

var App = React.createClass({

    loading : true,

    getInitialState : function(){
        return {
            time : null,
            isShare : null,
            lastTimes: 0,
            integral: null,
            zbStatus : {},
            zbList : [],
            dhPrize : [],
            award : [],
            guess : [],
            lottery : {}
        }
    },

    download : function(btn){
        let nbtn = document.querySelector(btn);
        if(!nbtn){
            return false;
        }
        if(ztInfo.terminal == CONFIG.WAP){
            nbtn.addEventListener('click',function(){
                window.location.href = ztInfo.checkIphone == "1" ? packageInfo.downloadUrlForIos : packageInfo.downloadUrlForAdroid;
            });
            return false;
        }
        if(ztInfo.terminal == CONFIG.BOX){
            appDownload(btn);
            return false;
        }
        if(ztInfo.terminal == CONFIG.YOUPAI){
            nbtn.style.display = "none";
            return false;
        }
    },

    updateShareStatus : function(){
        this.setState({
            isShare : true,
        })
    },

    updateIntegral : function(newIntegral){
        this.setState({
            integral : newIntegral,
        })
    },

    updateLastTimes : function(newLastTimes){
        this.setState({
            lastTimes : newLastTimes,
        })
    },

    updataExchangeItem : function({pid,code}){
        let _exchangeItem = this.state.dhPrize.find(item => item.pid == pid);
        _exchangeItem.code = code;
        this.setState({
            dhPrize : this.state.dhPrize
        })
    },

    updateGuessItem : function({stageId,mid,tid}){
        let _matches = this.state.guess.find(stageItem => stageItem.id == stageId).list,
            _match = _matches.find(match => match.team1.mid == mid);
        for(let key in _match){
            let _team = _match[key];
            _team.status = _team.id == tid ? 2 : null;
        }
        this.setState({
            guess : this.state.guess
        })
    },

    updateLotteryIndex : function(index){
        this.state.lottery.index = index;
        this.setState({
            lottery : this.state.lottery
        })
    },

    checkTerminal : function(){
        let prefix = {
            BOX : "4399GameCenter",
            YOUPAI : "4399YouPai"
        }
        if(navigator.userAgent.indexOf(prefix.BOX) > 0){
            return 'box';
        }else if(navigator.userAgent.indexOf(prefix.YOUPAI) > 0){
            return 'youpai';
        }else{
            return 'pc';
        }
    },

    getInitData : function(){
        this.loading = true;
        Ajax.post(API.init,{})
            .then(response => {
                this.loading = false;
                ztInfo.status = response.data.zt.status || "3";
                ztInfo.environment = response.data.zt.environment || "DEV",
                ztInfo.checkIphone = response.data.zt.checkIphone || "",
                ztInfo.mobiLoginUrl = response.data.zt.mobiLoginUrl || "",
                ztInfo.deadline = response.data.pageInfo.deadline || "",
                shareInfo.title = response.data.shareInfo.title,
                shareInfo.img = response.data.shareInfo.img,
                shareInfo.desc = response.data.shareInfo.desc,
                userInfo.uid = response.data.uid || "";
                userInfo.nick = response.data.nick || "";
                packageInfo = response.data.pkg || {};
                packageInfo.downloadUrlForIos = response.data.downloadUrlForIos || "";
                packageInfo.downloadUrlForAdroid = response.data.downloadUrlForAdroid || "";
                this.setState({
                    time : response.data.pageInfo.time || "",
                    isShare : response.data.pageInfo.isShare || false,
                    lastTimes: response.data.pageInfo.lastTimes || "",
                    integral: response.data.pageInfo.point || 0,
                    zbList : response.data.pageInfo.zbList || [],
                    zbStatus : response.data.pageInfo.zbStatus || {},
                    dhPrize : response.data.pageInfo.dhPrize || [],
                    award : response.data.pageInfo.award || [],
                    guess : response.data.pageInfo.jc || [],
                    lottery : {
                        index : 0,
                        prizes : response.data.pageInfo.lottery.prizes
                    }
                })
                this.download('.j-download');
            })
            // .catch(function (error) {
            //     console.log(error);
            // });
    },

    componentDidMount : function(){
        
        ztInfo.terminal = this.checkTerminal();
        
        if(ztInfo.terminal == CONFIG.BOX){
            ClientBox.init();
        }
        if(ztInfo.terminal == CONFIG.YOUPAI){
            ClientYoupai.init(this.getInitData);
        }else{
            this.getInitData();
        }
        
        Pubsub.subscribe("UPDATE_LASTTIMES",(msg,newLastTimes) => {
            this.updateLastTimes(newLastTimes);
        });
        Pubsub.subscribe("UPDATE_INTEGRAL",(msg,newIntegral) => {
            this.updateIntegral(newIntegral);
        });
        Pubsub.subscribe("UPDATE_SHARE_STATUS",(msg) => {
            this.updateShareStatus();
        });
        Pubsub.subscribe("UPDATE_GUESS_ITEM",(msg,data) => {
            this.updateGuessItem(data);
        });
        Pubsub.subscribe("UPDATE_EXCHANGE_ITEM",(msg,data) => {
            this.updataExchangeItem(data);
        });
        Pubsub.subscribe("UPDATE_LOTTERY_INDEX",(msg,index) => {
            this.updateLotteryIndex(index);
        });
        Pubsub.subscribe("DIALOG_FORM_OPEN",(msg,item) => {
            PopupView.form(<DialogForm item={item}/>)
        });
   
    },

    componentWillUnmount : function(){
        Pubsub.unsubscribe("UPDATE_LASTTIMES");
        Pubsub.unsubscribe("UPDATE_INTEGRAL");
        Pubsub.unsubscribe("UPDATE_SHARE_STATUS");
        Pubsub.unsubscribe("UPDATE_GUESS_ITEM");
        Pubsub.unsubscribe("UPDATE_EXCHANGE_ITEM");
        Pubsub.unsubscribe("UPDATE_LOTTERY_INDEX");
        Pubsub.unsubscribe("DIALOG_FORM_OPEN");
    },

    render : function(){
        return (
            <div className="wrap">
                <div className="container">
                    <WgMod title="游戏下载模块">
                        <a href="javascript:;" className="btn--download j-download">游戏下载</a>
                    </WgMod>
                    <WgMod title="赛事直播模块">
                        {this.loading == true ? 
                            <LoadingEllipsis/>
                            :
                            <Mod name="sszb" titleName={this.state.zbStatus.headTit
                                // "A|B"
                                //     .replace("A",/^[\u4e00-\u9fa5]{2}/.exec(this.state.zbStatus.headTit))
                                //     .replace("B",/[\u4e00-\u9fa5]{2}$/.exec(this.state.zbStatus.headTit))
                                }
                            >
                                <Live zbStatus={this.state.zbStatus} />
                            </Mod>
                        }
                    </WgMod>
                    <WgMod title="赛事列表模块">
                        <Mod name="ssjl" titleName="赛事列表">
                            {this.loading == true ? <LoadingEllipsis/> : <LiveList zbList={this.state.zbList} />}
                        </Mod>
                    </WgMod>
                    <WgMod title="赛事奖励模块">
                        <Mod name="ssjl" titleName="赛事奖励">
                            {this.loading == true ? <LoadingEllipsis/> : <Award list={this.state.award}/>}
                        </Mod>
                    </WgMod>
                    <WgMod title="赛事竞猜模块">
                        <Mod name="ssjc" titleName="赛事竞猜">
                            {this.loading == true ? <LoadingEllipsis/> : <Share isShare={this.state.isShare}></Share>}
                            {this.loading == true ? <LoadingEllipsis/> : <Guess stageList={this.state.guess} integral={this.state.integral} isShare={this.props.isShare}/>}
                        </Mod>
                    </WgMod>
                    <WgMod title="礼包兑换模块">
                        <Mod name="lbdh" titleName="礼包兑换">
                            {this.loading == true ? <LoadingEllipsis/> : <Exchange list={this.state.dhPrize} integral={this.state.integral}/>}
                        </Mod>
                    </WgMod>
                    <WgMod title="我的礼包模块">
                        <MyAward />
                    </WgMod>
                    <WgMod title="转盘抽奖模块">
                        {this.loading == true ? <LoadingEllipsis/> : <Lottery prizes={this.state.lottery.prizes} index={this.state.lottery.index} lastTimes={this.state.lastTimes}/>}
                    </WgMod>
                </div>
            </div>
        )
    }
})

module.exports = App;