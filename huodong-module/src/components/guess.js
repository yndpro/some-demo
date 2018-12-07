import React from 'react';
import GuessStageItem from './guess_stage_item';
import {PopupView} from './PopView';
import DialogGuessResult from './dialog_guessResult';
import User from './user';
import './guess.scss';

var Guess = React.createClass({
    arrResultData : [],
    handleMore : function(){
        if(this.arrResultData){
            for(let i=0,stageItem;stageItem=this.arrResultData[i],i < this.arrResultData.length;i++) {
                stageItem.guessResults = [];
                for(let j=0,groupItem;groupItem=stageItem.list[j],j < stageItem.list.length;j++){
                    if(groupItem.team1.status == 2){
                        stageItem.guessResults.push(groupItem.team1.name);
                    }
                    if(groupItem.team2.status == 2){
                        stageItem.guessResults.push(groupItem.team2.name);
                    }
                }
            }
        }
        PopupView.guessResult(<DialogGuessResult resultList={this.arrResultData}/>);
    },

    render : function(){
        let {stageList = [],integral} = this.props;
        let guessStageItems = "loading...";
        let _str = "";
        
        if(stageList.length > 0){
            
            while(stageList[1] && stageList[1].list != 0){
                _str += /^.{2}/.exec(stageList[0].name) + "、";
                this.arrResultData.push(stageList.shift());
            }
            if(_str) _str = _str.slice(0,_str.length - 1);

            // if(stageList[0].id == 4 && stageList[0].startTime == this.arrResultData[2].startTime){
            //     _str = /(.*)、/.exec(_str)[1];
            //     stageList.unshift(this.arrResultData.pop());
            // }

            guessStageItems = stageList.map(item => <GuessStageItem key={item.id} id={item.id} stage={item}/>)
            // this.$wrap.html(baidu.template('encounterListTmpl',{stageList:stageList,stageMoreStr:_str}));
        }

        return (
            <div>
                <div className="ssjc-mid">
                    <User></User>
                    <div className="ssjc-integ">当前积分：<span>{integral}</span></div>
                </div>
                <div className="ssjc-cont">
                    {guessStageItems}
                    {
                        this.arrResultData.length > 0 ? 
                        <a href="javascript:;" className="ssjc-more" onClick={this.handleMore}>查看历史竞猜结果{/* <span className="more-up">点击查看 :{_str}赛</span> <span className="more-normal">晋级/竞猜 结果</span>  */}</a>
                        : 
                        ""
                    }
                </div>
            </div>
        )
    }
})

module.exports = Guess;