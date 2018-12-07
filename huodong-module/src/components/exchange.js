import React from 'react';
import ExchangeItem from './exchange_item';
import './exchange.scss';

var Exchange = React.createClass({
    render : function(){
        let {list = [],integral} = this.props;
        return (
            <div className="lbdh">
                <div className="lbdh-integ">剩余积分：{integral}</div>
                <ul className="lbdh-list">
                {   
                    (!list || !list.length) ? 
                    <div>loading...</div>
                    :
                    list.map((item,index) => <ExchangeItem key={index} item={item} integral={integral}/>)
                }
                </ul>
            </div>
        )
    }
})

module.exports = Exchange;