import React from 'react';
import {Link} from "react-router";
import Progress from '../components/progress';
import './player.scss';

var duration = null;

var Player = React.createClass({
    getInitialState : function(){
        return {
            progress : '0',
            volume : '50',
            isPlay : false
        }
    },

    componentDidMount : function(){
        var _this = this;

        $('#player').jPlayer({
            supplied:'mp3',
            wmode:'window',
            volume : _this.state.volume * 0.01,
            ready : function(){
                $(this).jPlayer('setMedia',{
                    mp3: _this.props.currentMusicItem.file
                });
                if(_this.state.isPlay){
                    $(this).jPlayer('play');
                }
            }
        });

        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            duration = e.jPlayer.status.duration;
            this.setState({
                progress : e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100
            })
        });

    },

    callbackChangeProgress : function(progress){
         $('#player').jPlayer(this.state.isPlay ? "play" : "pause",duration * progress * 0.01);
    },

    callbackChangeVolume : function(progress){
        $('#player').jPlayer("volume",progress * 0.01);
        this.setState({
            volume : progress
        })
    },

    play : function(){
        if(this.state.isPlay){
            $('#player').jPlayer('pause')
        }else{
            $('#player').jPlayer('play')
        }
        this.setState({
            isPlay : !this.state.isPlay
        })
    },

    componentWillUnMount : function(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    },

    render : function(){
        return (
            <div className="page page--player">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20" style={{float:'left',width:'450px'}}>
                    <div className="controll-wrapper" style={{width:'100%'}}>
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h2 className="music-artist mt10">{this.props.currentMusicItem.artist}</h2>
                        <div className="row mt20">
                            <div className="left-time -col-auto"></div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top:5,left:10}}></i>
                                <div className="volume-wrapper" style={{marginLeft:20,width:100}}>
                                    <Progress progress={this.state.volume} callbackChangeProgress={this.callbackChangeVolume}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{height:10,lineHeight:'10px',width:'100%'}}>
                        <Progress progress={this.state.progress} callbackChangeProgress={this.callbackChangeProgress}/>
                    </div>
                    <div className="mt35 row" style={{width:'100%'}}>
                        <div style={{width:'50%'}}>
                            <i className="icon prev"></i>
                            <i className={`icon ml20 ${this.state.isPlay ? "pause" : "play"}`} onClick={this.play}></i>
                            <i className="icon next ml20"></i>
                        </div>
                        <div className="-col-auto" style={{width:'50%'}}>
                            <i className="" style={{float:'right',}}></i>
                        </div>  
                    </div>
                </div>
                <div className="-col-auto cover" style={{float:'left',width:'200px'}}>
                    <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title} />
                </div>
            </div>
        )
    }
})

export default Player;