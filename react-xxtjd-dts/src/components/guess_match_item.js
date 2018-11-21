import React from 'react';

var GuessMatchItem = React.createClass({

    
    render : function(){
        let {item = [],stageId} = this.props;

        let passTag = stageId => {
            switch(stageId){
                case 3 :
                    return "季军"
                case 4 :
                    return "冠军"
                default :
                    return "晋级"
            }
        }

        let guessBtn = team => {
            switch(team.status){
                case 2 :
                    return <a href="javascript:;"  class="team-guess guessed j-guess">已竞猜</a>
                case 4 :
                    return <a href="javascript:;"  class="team-guess missed j-guess">竞猜已结束</a>
                case 1 :
                    return <a href="javascript:;"  class="team-guess j-guess" data-mid={team.mid} data-tid={team.id}>竞猜</a>
                default :
                    return null
            }
        }

        return (
            <li>
                <div class="item-team">
                    {item.team1.win ? <div class="item-pass">{tagPass(stageId)}</div> : ""}
                    <div class="team-name">{item.team1.name}</div>
                    {guessBtn(item.team1)}
                </div>
                <div class="item-team">
                    {item.team2.win ? <div class="item-pass">{passTag(stageId)}</div> : ""}
                    <div class="team-name">{item.team2.name}</div>
                    {guessBtn(item.team2)}
                </div>
            </li>
        )
    }
})

module.exports = GuessMatchItem;





