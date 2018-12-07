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
import {appDownload} from '../components/download';
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
            guess : []
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

    getInit : function(){
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
                    guess : response.data.pageInfo.jc || []
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
            ClientYoupai.init(this.getInit);
        }else{
            this.getInit();
        }
        
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
   
    },

    componentWillUnmount : function(){
        Pubsub.unsubscribe("UPDATE_INTEGRAL");
        Pubsub.unsubscribe("UPDATE_SHARE_STATUS");
        Pubsub.unsubscribe("UPDATE_GUESS_ITEM");
        Pubsub.unsubscribe("UPDATE_EXCHANGE_ITEM");
    },

    render : function(){
        return (
            <div className="view">
                <div className="wrap">
                    <div className="head">
                        <div className="bg1"></div>
                        <div className="bg2"></div>
                        <div className="bg3"></div>
                        <div className="bg4"></div>
                    </div>
                    <div className="container">
                        <div className="time">比赛时间：{this.state.time}</div>
                        <a href="javascript:;" className="btn--download j-download">游戏下载</a>
                        {this.loading == true ? 
                            "loading..." 
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
                        <LiveList zbList={this.state.zbList} />
                        <Mod name="ssjl" titleName="赛事奖励">
                            {this.loading == true ? "loading..." : <Award list={this.state.award}/>}
                        </Mod>
                        <Mod name="ssjc" titleName="赛事竞猜">
                            {this.loading == true ? "loading..." : <Share isShare={this.state.isShare}></Share>}
                            {this.loading == true ? "loading..." : <Guess stageList={this.state.guess} integral={this.state.integral} isShare={this.props.isShare}/>}
                        </Mod>
                        <Mod name="lbdh" titleName="礼包兑换">
                            {this.loading == true ? "loading..." : <Exchange list={this.state.dhPrize} integral={this.state.integral}/>}
                        </Mod>
                    </div>
                    <div className="footer">本活动最终解释权归赛事举办方所有</div>
                </div>
            </div>
        )
    }
})

module.exports = App;