import React from 'react';
import LivePlayer from './live_player';
import './live.scss';

var Live = React.createClass({
    handleGoYoupai : function(){
        document.location.href = "protocol://toMobileLive?id=" + this.props.zbStatus.zbId;
    },
    render : function(){
        let {zbStatus} = this.props;
        
        return (
            <div className="sszb-wrap">
                <div className="sszb-cont">
                    {zbStatus.status == CONFIG.NO_LIVE ?
                    <img width="100%" height="100%" alt="" src={zbStatus.defaultImg}/>
                    :
                    <LivePlayer zbStatus={zbStatus}/>
                    }
                </div>
                {(ztInfo.terminal == CONFIG.YOUPAI && zbStatus.zbId) ?
                <a href="javascript:;" className="sszb-goYoupai" onClick={this.handleGoYoupai}>进入游拍直播间</a>
                :
                ""
                }
            </div>
        )
    }
})

module.exports = Live;