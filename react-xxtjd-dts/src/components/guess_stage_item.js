import React from 'react';
import GuessMatchItem from './guess_match_item';

var GuessStageItem = React.createClass({
    render : function(){
        let {stage = []} = this.props;
        let guessMatchItems = stage.list.map(item => <GuessMatchItem stageId={stage.id} item={item}/>);

        return (
            <div class={`ssjc-encounter ssjc-encounter--${stage.id}`}>
                <div class="encounter-tit"><h6>{stage.name}</h6></div>
                <div class="encounter-cont">
                    {stage.list == '' ?
                    <div class="encounter-nodata">竞猜未开始，{stage.startTime}开启竞猜</div>
                    :
                    <ul class="encounter-list">
                        {guessMatchItems}
                    </ul>
                    }
                </div>
            </div>
        )
    }
})

module.exports = GuessStageItem;