import React from 'react';
import AwardItem from './award_item';
import './award.scss';

var Award = React.createClass({
    render : function(){
        let {list = []} = this.props;
        return (
            <ul className="ssjl-list">
            {   
                (!list || !list.length) ? 
                <div>loading...</div>
                :
                list.map((item,index) => <AwardItem key={index} item={item}/>)
            }
            </ul>
        )
    }
})

module.exports = Award;