import React from 'react';
import ModTitle from './mod_title';
import GuessStageItem from './guess_stage_item';
import './guess.scss';

var Guess = React.createClass({

    render : function(){
        let {stageList = [],integral} = this.props;
        let arrResultData = [];
        let guessStageItems = "loading...";
        
        if(stageList.length > 0){
            let _str = "";
            while(stageList[1] && stageList[1].list != 0){
                _str += /^.{2}/.exec(stageList[0].name) + "、";
                this.arrResultData.push(stageList.shift());
            }
            if(_str) _str = _str.slice(0,_str.length - 1);

            if(stageList[0].id == 4 && stageList[0].startTime == this.arrResultData[2].startTime){
                _str = /(.*)、/.exec(_str)[1];
                stageList.unshift(this.arrResultData.pop());
            }
            console.log(stageList)
            console.log(_str)

            guessStageItems = stageList.map(item => <GuessStageItem id={item.id} stage={item}/>)
            // this.$wrap.html(baidu.template('encounterListTmpl',{stageList:stageList,stageMoreStr:_str}));
        }

        
        return (
            <div className="mod mod--ssjc">
                <div className="mod-hd">
                    <ModTitle name={"赛事|竞猜"} bullet="left"/>
                </div>
                <div className="mod-bd">
                    <div className="ssjc-share">
                        {ztInfo.terminal == CONFIG.WAP ? "" : <div className="share-instr">成功分享该页面即可获得10积分！<span>（仅限1次）</span></div>}
                        <div className="share-oper">
                            {ztInfo.terminal == CONFIG.WAP ? "" : <a href="javascript:;" className="j-share">立即分享</a>}
                            <a href="javascript:;" className="j-ssjc-instr">竞猜说明</a>
                        </div>
                    </div>
                    <div className="ssjc-user user">
                        {userInfo.uid > 0 ? 
                        <div className="user-log j-login-info">
                            <span className="user-greet">您好，</span>
                            <span className="user-name j-username" title="">{userInfo.nick}</span>
                        </div>
                        :
                        <div className="user-ulog j-unlogin-info">
                            <a href="javascript:;" className="user-login j-login-btn">【登录】</a>
                            {ztInfo.terminal == CONFIG.WAP ? <a href="javascript:;" className="user-logout j-logout-btn">【退出】</a> : ""}
                        </div>
                        }
                        <div className="ssjc-integ">当前积分：<span className="j-integral">{integral}</span></div>
                    </div>
                    <div className="ssjc-cont">
                        {guessStageItems}
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Guess;