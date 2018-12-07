import React from 'react';
import IScroll from 'iscroll';

var DialogGuessResult = React.createClass({

    componentDidMount : function(){
        this.iScroll = new IScroll('#j-iscroll',{
            scrollbars: 'custom'
        });
    },
    componentWillUnmount : function(){
        this.iScroll.destroy();
        this.iScroll = null;
    },
    render : function(){
        let {resultList} = this.props;

        // let getTeamPass = (stageId) => {
        //     switch(stageId){
        //         case "4" : 
        //             return "【季军】";
        //         case "3" : 
        //             return "【冠军】";
        //         default :
        //             return "【晋级】";
        //     }
        // }

    
        return (
            <div className="dialog-cont" id="j-iscroll">
                <ul className="result-scroll">
                {
                    resultList.map((stageItem,index) => 
                    <li className="result-encounter" key={index}>
                        <div className="encounter-tit"><h6>{stageItem.name}</h6></div>
                        <div className="encounter-cont">
                            <dl>
                                <dt>参赛队伍：</dt>
                                <dd>
                                    <ul>
                                        {stageItem.list.map((groupItem,index) => 
                                            groupItem.team1.win ? 
                                            <li key={index}>
                                                <div className="item-team">
                                                    <span className="team-pass">{`【${groupItem.team1.level}】`}</span>
                                                    <span className="team-name">{groupItem.team1.name}</span>
                                                </div>
                                                <div className="item-team">
                                                    <span className="team-name">{groupItem.team2.name}</span>
                                                </div>
                                            </li>
                                            :
                                            <li key={index}>
                                                <div className="item-team">
                                                <span className="team-pass">{`【${groupItem.team2.level}】`}</span>
                                                    <span className="team-name">{groupItem.team2.name}</span>
                                                </div>
                                                <div className="item-team">
                                                    <span className="team-name">{groupItem.team1.name}</span>
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </dd>
                            </dl>
                            <dl>
                                <dt>您所竞猜的队伍：</dt>
                                <dd>
                                    {stageItem.guessResults == "" ?
                                    <div>您未参与该轮竞猜</div>
                                    :
                                    stageItem.guessResults.map((guessResult,index) => <div key={index} className="item-team">{guessResult}</div>)
                                    }
                                </dd>
                            </dl>
                        </div>
                    </li>
                    )
                }
                </ul>
            </div>
        )
    }
})

module.exports = DialogGuessResult;