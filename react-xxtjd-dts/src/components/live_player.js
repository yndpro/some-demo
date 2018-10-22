import React from 'react';
import {pageInfo} from '../util';

var LivePlayer = React.createClass({
    render : function(){
        let {zbStatus} = this.props,url = null,className = null,cover = null;

        if(zbStatus.status == pageInfo.LIVE){
            className = "sszb-youpai";
            url = zbStatus.yp;
            cover = zbStatus.cover;
        }
        if(zbStatus.status == pageInfo.PLAY_BACK){
            className = "sszb-video";
            url = zbStatus.spUrl;
            cover = zbStatus.cover;
        }

        return (
            <div className={className}>
                {url == "" ? 
                <img src={cover} alt=""/>
                :
                <video id="video" className="video-palyer" width="100%" height="100%" webkit-playsinline playsinline x5-video-player-type='h5' x5-video-player-fullscreen='true' data-setup="{}" controls="controls" preload="none" style={{}} poster="video_poster.png">
                    <source src={url} />
                    <span>您的手机版本，网页版暂未能支持！</span>
                </video>
                }
            </div>
        )
    }
})

module.exports = LivePlayer;