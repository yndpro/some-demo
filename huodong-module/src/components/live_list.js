import React from 'react';
import './live_list.scss';

var LiveList = React.createClass({
    render : function(){
        let {zbList = []} = this.props;
        return (
            <div className="mod--sclb">
                <div className="sclb-tit">赛事列表</div>
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
                        if(item.status == 0) status = <p className="item-status item-status--expect">敬请期待</p>;
                        return <li key={item.id} className="sclb-item">
                            <p className="item-time">{item.p1}</p>
                            <p className="item-stage">{item.tit}</p>
                            {item.closest ? <p className="item-closest"></p> : ""}
                            {status}
                        </li>  
                    })
                }
                </ul>
            </div>
        )
    }
})

module.exports = LiveList;