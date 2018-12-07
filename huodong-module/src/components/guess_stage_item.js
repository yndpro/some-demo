import React from 'react';
import GuessMatchItem from './guess_match_item';

var GuessStageItem = React.createClass({
    render : function(){
        let {stage = []} = this.props;

        return (
            <div className={`ssjc-encounter ssjc-encounter--${stage.id}`}>
                <div className="encounter-tit"><h6>{stage.name}</h6></div>
                <div className="encounter-cont">
                    {stage.list == '' ?
                    <div className="encounter-nodata">竞猜未开始，{stage.startTime}开启竞猜</div>
                    :
                    <ul className="encounter-list">
                        {stage.list.map((item,index) => <GuessMatchItem key={index} stageId={stage.id} item={item}/>)}
                    </ul>
                    }
                </div>
            </div>
        )
    }
})

module.exports = GuessStageItem;