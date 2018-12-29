import React from 'react';
import Pubsub from 'pubsub-js';
import API from '../assets/js/api';
import {PopupView} from './PopView';

var GuessMatchItem = React.createClass({

    handleGuess : function(mid,tid){
        
        let _this = this;

        this.tid = tid;
        this.mid = mid;

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

        PopupView.confirm({
            'title':'你确定要竞猜该战队？',
            'btnList':['confirm','cancel']
        },function () {
            document.querySelector(".j-confirm").addEventListener("click", () => {
                Ajax.post(API.postGuess, {'tid': tid, 'mid': mid})
                    .then(response => {
                        _this.resolve(response);
                    });
            });
        });
    },


    resolve : function (result) {

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

        if(result.status == 1){
            PopupView.tip("竞猜成功！");
            Pubsub.publish("UPDATE_GUESS_ITEM",{
                stageId : this.props.stageId,
                mid : this.mid,
                tid : this.tid
            });
        }

    },
    
    render : function(){
        let {item = [],stageId} = this.props;

        // let passTag = stageId => {
        //     switch(parseInt(stageId)){
        //         case 4 :
        //             return "季军"
        //         case 3 :
        //             return "冠军"
        //         default :
        //             return "晋级"
        //     }
        // }

        let guessBtn = team => {
            switch(parseInt(team.status)){
                case 2 :
                    return <a href="javascript:;"  className="team-guess guessed">已竞猜</a>
                case 4 :
                    return <a href="javascript:;"  className="team-guess missed">竞猜已结束</a>
                case 1 :
                    return <a href="javascript:;"  className="team-guess" onClick={() => this.handleGuess(team.mid,team.id)}>竞猜</a>
                default :
                    return null
            }
        }

        return (
            <li>
                <div className="item-team">
                    {item.team1.win ? <div className="item-pass">{item.team1.level}</div> : ""}
                    <div className="team-name">{item.team1.name}</div>
                    {guessBtn(item.team1)}
                </div>
                <div className="item-team">
                    {item.team2.win ? <div className="item-pass">{item.team2.level}</div> : ""}
                    <div className="team-name">{item.team2.name}</div>
                    {guessBtn(item.team2)}
                </div>
            </li>
        )
    }
})

module.exports = GuessMatchItem;





