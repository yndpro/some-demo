import React from 'react';
import {pageInfo} from '../util';

var Exchange = React.createClass({
    render : function(){
        let {list = []} = this.props;
        return (
            <div className="mod mod--sclb">
                <div className="mod-hd">
                    <ModTitle name={"礼包|列表"} bullet="left"/>
                </div>
                <div className="mod-bd">
                    <ul className="sclb-list">
                    {   
                        (!list || !list.length) ? 
                        <div>loading...</div>
                        :
                        list.map(item => {
                            return <li className="lbdh-item">
                                <a href="javascript:;" className="item-cover">
                                    <p className="item-int">{/\d{2}/.exec(item.p_name)}积分</p>
                                    <img className="item-img" src={item.img} alt=""/>
                                    <p className="item-more" data-detail={item.detail}>查看详情</p>
                                </a>
                                {
                                    item.code ? 
                                    <a href="javascript:;" className="item-dh j-dh-get geted" 
                                        data-code={item.code} 
                                        data-point={/\d{2}/.exec(item.p_name)} 
                                        data-pid={item.pid} 
                                        data-name={item.p_name}>
                                    </a>
                                    :
                                    <a href="javascript:;" className="item-dh j-dh-get" 
                                        data-point={/\d{2}/.exec(item.p_name)} 
                                        data-pid={item.pid} 
                                        data-name={item.p_name}>
                                    </a>
                                }
                            </li>
                        })
                    }
                    </ul>
                </div>
            </div>
        )
    }
})

module.exports = Exchange;