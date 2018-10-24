import React from 'react';
import Download from '../components/download';
import Live from '../components/live';
import LiveList from '../components/live_list';
import Exchange from '../components/exchange';
import './app.scss';

var App = React.createClass({

    getInitialState : function(){
        return {
            userInfo : {
                scookie : "",
                uid : "",
                nick : "",
                avatar : "",
                level : ""
            },
            isShare : null,
            lastTimes: 0,
            score: null,
            zbStatus : {},
            zbList : {},
            dhPrize : {}
        }
    },

    componentDidMount : function(){
        Ajax.post(ztUrl + '-ajaxInitBx',{},this.state.userInfo)
            .then(response => {
                this.setState({
                    userInfo : {
                        scookie : "",
                        uid : response.data.uid,
                        nick : response.data.nick,
                        avatar : "",
                        level : ""
                    },
                    isShare : response.data.pageInfo.isShare,
                    lastTimes: response.data.pageInfo.lastTimes,
                    score: response.data.pageInfo.score,
                    zbList : response.data.zbList,
                    zbStatus : response.data.zbStatus,
                    dhPrize : response.data.pageInfo.dhPrize
                })
            })
            // .catch(function (error) {
            //     console.log(error);
            // });
        
    },

    render : function(){
        return (
            <div className="view">
                <div className="wrap">
                    <div className="head">
                        <div className="bg1"></div>
                        <div className="bg2"></div>
                        <div className="bg3"></div>
                    </div>
                    <div className="container">
                        <Download />
                        <Live zbStatus={this.state.zbStatus} />
                        <LiveList zbList={this.state.zbList} />
                        <Exchange list={this.state.dhPrize}  userInfo={this.state.userInfo}/>
                    </div>
                    <div className="footer">本活动最终解释权归赛事举办方所有</div>
                </div>
            </div>
        )
    }
})

module.exports = App;