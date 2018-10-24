import React from 'react';
import ModTitle from './mod_title';
import {pageInfo} from '../util';
import './live_list.scss';

var LiveList = React.createClass({
    render : function(){
        let {zbList = []} = this.props;
        return (
            <div className="mod mod--sclb">
                <div className="mod-hd">
                    <ModTitle name={"赛程|列表"} bullet="left"/>
                </div>
                <div className="mod-bd">
                    <ul className="sclb-list">
                    {   
                        (!zbList || !zbList.length) ? 
                        <div>loading...</div>
                        :
                        zbList.map(item => {
                            let status;
                            if(item.status == 1) status = <p className="item-status item-status--live">正在直播</p>;
                            if(item.status == 2) status = <p className="item-status item-status--ready">即将开始</p>;
                            if(item.status == 3) status = <p className="item-status item-status--over">已结束</p>;
                            if(item.status == 4) status = <p className="item-status item-status--ready">敬请期待</p>;
                            return <li className="sclb-item">
                                <p className="item-time">{item.p1}</p>
                                <p className="item-stage">{item.tit}</p>
                                {status}
                            </li>  
                        })
                    }
                    </ul>
                </div>
            </div>
        )
    }
})

module.exports = LiveList;