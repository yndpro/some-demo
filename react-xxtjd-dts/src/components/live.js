import React from 'react';
import {pageInfo} from '../util';
import './live.scss';

var Live = React.createClass({
    render : function(){
        
        let content = null;
        if(this.props.status == pageInfo.LIVE){
            content = (
                <div className="sszb-youpai">
                    {this.props.yp == "" ? 
                    <img src={this.props.cover} alt=""/>
                    :
                    <video id="video" className="video-palyer" width="100%" height="100%" webkit-playsinline playsinline x5-video-player-type='h5' x5-video-player-fullscreen='true' data-setup="{}" controls="controls" preload="none" style={{}} poster="video_poster.png">
                        <source src={this.props.yp} />
                        <span>您的手机版本，网页版暂未能支持！</span>
                    </video>
                    }
                </div>
            )
        }else{
            content = (
                <div className="sszb-video">
                    {this.props.yp == "" ? 
                    <img src={this.props.cover} alt=""/>
                    :
                    <video id="video" className="video-palyer" width="100%" height="100%" webkit-playsinline playsinline x5-video-player-type='h5' x5-video-player-fullscreen='true' data-setup="{}" controls="controls" preload="none" style={{}} poster="video_poster.png">
                        <source src={this.props.spUrl} />
                        <span>您的手机版本，网页版暂未能支持！</span>
                    </video>
                    }
                </div>
            )
        }
        return (
            <div className="mod mod--sszb">
                <div className="mod-hd">
                    <h2 className="mod-tit">
                        
                    <i className="mod-bullet-r"></i></h2>
                </div>
                <div className="mod-bd">
                    <div className="sszb-wrap">
                        <div className="sszb-cont">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Download;