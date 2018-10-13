import React from 'react';
import {Link} from "react-router";
import Pubsub from 'pubsub-js';
import Progress from '../components/progress';
import './player.scss';


var Player = React.createClass({

    changeProgress : function(progress){
        Pubsub.publish("CHANGE_PROGRESS",progress);
    },

    changeVolume : function(volume){
        Pubsub.publish("CHANGE_VOLUME",volume);
    },

    playMusic : function(){
        Pubsub.publish("PLAY_MUSIC");
    },

    playNext : function(){
        Pubsub.publish("PLAY_NEXT_MUSIC");
    },

    playPrev : function(){
        Pubsub.publish("PLAY_PREV_MUSIC");
    },

    changeRepeatType : function(){
        Pubsub.publish("CHANGE_REPEAT_TYPE");
    },

    getLeftTime : function(){
        return this.formateTime(this.props.duration * (1 - this.props.progress * 0.01));
    },

    formateTime : function(seconds){
        let minute = Math.floor(seconds / 60);
        let second = Math.floor(seconds % 60);
        if(minute < 10) minute = `0${minute}`;
        if(second < 10) second = `0${second}`;
        return `${minute} : ${second}`;
    },

    componentDidMount : function(){
        
        
    },

    componentWillUnMount : function(){
        
    
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
                            <div className="left-time -col-auto">{this.getLeftTime()}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top:5,left:10}}></i>
                                <div className="volume-wrapper" style={{marginLeft:20,width:100}}>
                                    <Progress progress={this.props.volume} callbackChangeProgress={this.changeVolume}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{height:10,lineHeight:'10px',width:'100%'}}>
                        <Progress progress={this.props.progress} callbackChangeProgress={this.changeProgress}/>
                    </div>
                    <div className="mt35 row" style={{width:'100%'}}>
                        <div style={{width:'50%'}}>
                            <i className="icon prev" onClick={this.playPrev}></i>
                            <i className={`icon ml20 ${this.props.isPlay ? "pause" : "play"}`} onClick={this.playMusic}></i>
                            <i className="icon next ml20" onClick={this.playNext}></i>
                        </div>
                        <div className="-col-auto" style={{width:'50%'}}>
                            <i className={`icon repeat-${this.props.repeatType}`} style={{float:'right',}} onClick={this.changeRepeatType}></i>
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