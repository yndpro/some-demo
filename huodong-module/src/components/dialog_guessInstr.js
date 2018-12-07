import React from 'react';
import Dialog from './dialog';

var DialogGuessInstr = React.createClass({
    getElementPageTop : function(element){
        let actualTop = element.offsetTop;
        let parent = element.offsetParent;
        while(parent != null){
            actualTop += parent.offsetTop + (parent.offsetHeight - parent.clientHeight) / 2;
            parent = parent.offsetParent;
        }
        return actualTop;
    },
    handleGoToGuess : function(){
        Dialog.list["j-guessInstr_popup"].close();
        console.log("test");
        setTimeout(function(){
            // window.scrollTo({
            //     top : this.getElementPageTop(document.querySelector(".mod--lbdh")),
            //     behavior: "smooth"
            // });
            Util.scrollTop(window,this.getElementPageTop(document.querySelector(".mod--lbdh")))
        }.bind(this),30);
        
    },
    render : function(){
        return (
            <div className="dialog-cont">
                <div className="instr-txt">每场比赛直播前，玩家均可以给自己喜欢或实力强的队伍投票参加我们竞猜活动！8进4阶段，每猜中一支获胜队伍可获得20积分；半/总决赛阶段，猜中队伍晋级冠军得40积分，猜中队伍晋级亚军得20积分。</div>
                <a href="javascript:;" className="instr-link" onClick={this.handleGoToGuess}>获取的积分,可兑换礼包哦 》》</a>
            </div>
        )
    }
})

module.exports = DialogGuessInstr;