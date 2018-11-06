import React from 'react';
import ModTitle from './mod_title';
import ExchangeItem from './exchange_item';
import './exchange.scss';

var Exchange = React.createClass({
    render : function(){
        let {list = [],integral} = this.props;
        return (
            <div className="mod mod--sclb">
                <div className="mod-hd">
                    <ModTitle name={"礼包|兑换"} bullet="left"/>
                </div>
                <div className="mod-bd">
                    <ul className="lbdh-list">
                    {   
                        (!list || !list.length) ? 
                        <div>loading...</div>
                        :
                        list.map(item => <ExchangeItem item={item} integral={integral}/>)
                    }
                    </ul>
                </div>
            </div>
        )
    }
})

module.exports = Exchange;