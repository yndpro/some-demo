import React from 'react';
import {pageInfo} from '../util';
import LivePlayer from './live_player';
import ModTitle from './mod_title';
import './live.scss';

var Live = React.createClass({
    render : function(){
        let {zbStatus} = this.props;
        
        return (
            <div className="mod mod--sszb">
                <div className="mod-hd">
                    <ModTitle 
                        name={"A|B"
                            .replace("A",/^[\u4e00-\u9fa5]{2}/.exec(zbStatus.headTit))
                            .replace("B",/[\u4e00-\u9fa5]{2}$/.exec(zbStatus.headTit))} 
                        bullet="right"
                    />
                </div>
                <div className="mod-bd">
                    <div className="sszb-wrap">
                        <div className="sszb-cont">
                            {zbStatus.status == pageInfo.NO_LIVE ?
                            <img width="100%" height="100%" alt="" src={zbStatus.defImg}/>
                            :
                            <LivePlayer zbStatus={zbStatus}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Live;