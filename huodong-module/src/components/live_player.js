import React from 'react';
import ReactDOM from 'react-dom';
import posterVideo from '../assets/images/video_poster.png';

var LivePlayer = React.createClass({

    componentDidMount: function() {
        if(this.refs.video){
            var video = ReactDOM.findDOMNode(this.refs.video);
            video.setAttribute('x5-video-player-type', 'h5');
            video.setAttribute('x5-video-player-fullscreen', 'true');
            video.setAttribute('playsinline', 'true');
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('controls', 'controls');
            video.setAttribute('autoplay', 'autoplay');
        }
    },
    
    render : function(){
        let {zbStatus} = this.props,url = null,className = null,cover = null,defaultImg = null;

        if(zbStatus.status == CONFIG.LIVE){
            className = "sszb-youpai";
            url = zbStatus.yp;
            cover = zbStatus.cover;
        }
        if(zbStatus.status == CONFIG.PLAY_BACK){
            className = "sszb-video";
            url = zbStatus.spUrl;
            cover = zbStatus.spCover;
        }
        defaultImg = zbStatus.defaultImg;

        return (
            <div className={className}>
                {url == "" ? 
                <img src={defaultImg} alt=""/>
                :
                <video id="video" 
                    className="video-palyer" 
                    width="100%" 
                    height="100%" 
                    data-setup="{}" 
                    preload="auto" 
                    style={{backgroundImage:`url(${cover})`,backgroundSize:`100% 100%`}} 
                    poster={posterVideo} 
                    ref={"video"}
                >
                    <source src={url} type="video/mp4"/>
                    <span>您的手机版本，网页版暂未能支持！</span>
                </video>
                }
            </div>
        )
    }
})

module.exports = LivePlayer;