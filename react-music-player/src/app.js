import React from 'react';
import Header from './components/header';
import Pubsub from 'pubsub-js';
import {MUSIC_LIST} from './data';

var duration = null;

var App = React.createClass({
    getInitialState : function(){
        return {
            musicList : MUSIC_LIST,
            currentMusicItem : MUSIC_LIST[0],
            progress : '0',
            volume : '50',
            isPlay : true,
            repeatType : "cycle"
        }
    },

    changeMusicItem : function(musicItem){
        $('#player').jPlayer('setMedia',{
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            isPlay : true,
            currentMusicItem : musicItem
        });
    },

    deleteMusicItem : function(musicItem){
        this.setState({
            musicList : this.state.musicList.filter(item => item !== musicItem)
        });
    },

    playNext : function(type = "next"){
        let index = this.state.musicList.indexOf(this.state.currentMusicItem);
        let length = this.state.musicList.length;
        if(type == "next"){
            index += 1;
        }else{
            index -= 1;
        }
        index = (index + length) % length;
        this.changeMusicItem(this.state.musicList[index]);
    },

    playMusic : function(){
        let $player = $('#player')

        if(this.state.isPlay){
            $player.jPlayer('pause')
        }else{
            $player.jPlayer('play')
        }
        this.setState({
            isPlay : !this.state.isPlay
        })

    },

    changeVolume : function(volume){
        $('#player').jPlayer("volume",volume * 0.01);
        this.setState({
            volume : volume
        })
    },

    changeProgress : function(progress){
        $('#player').jPlayer(this.state.isPlay ? "play" : "pause",duration * progress * 0.01);
    },

    changeRepeatType : function(){
        const repeatType = [
            "once",
            "cycle",
            "cycle_one",    
            "random"
        ];
        let index = repeatType.indexOf(this.state.repeatType);
            index = (index + 1) % repeatType.length;
        this.setState({
            repeatType : repeatType[index]
        });
    },

    componentDidMount : function(){

        $('#player').jPlayer({
            supplied:'mp3',
            wmode:'window',
            volume : 50 * 0.01
        });

        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            duration = e.jPlayer.status.duration;
            this.setState({
                progress : e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100
            })
        });
    
        $('#player').bind($.jPlayer.event.ended,(e)=>{
            let index;
            if(this.state.repeatType == "cycle"){
                this.playNext();
            }else if(this.state.repeatType == "cycle_one"){
                this.changeMusicItem(this.state.currentMusicItem);
            }else if(this.state.repeatType == "random"){
                index = Math.floor(Math.random() * this.state.musicList.length);
                this.changeMusicItem(this.state.musicList[index]);
            }else if(this.state.repeatType == "once"){
                this.setState({
                    isPlay : false,
                    progress : 0
                })
            }else{}           
        });
        
        this.changeMusicItem(this.state.currentMusicItem);
        
        
        Pubsub.subscribe("SELECT_MUSIC_ITEM",(msg,musicItem)=>{
            this.changeMusicItem(musicItem);
        });
        Pubsub.subscribe("DELETE_MUSIC_ITEM",(msg,musicItem)=>{
            this.deleteMusicItem(musicItem);
        });
        Pubsub.subscribe("PLAY_MUSIC",(msg)=>{
            this.playMusic();
        });
        Pubsub.subscribe("PLAY_NEXT_MUSIC",(msg)=>{
            this.playNext();
        });
        Pubsub.subscribe("PLAY_PREV_MUSIC",(msg)=>{
            this.playNext("prev");
        });
        Pubsub.subscribe("CHANGE_VOLUME",(msg,volume)=>{
            this.changeVolume(volume);
        });
        Pubsub.subscribe("CHANGE_PROGRESS",(msg,progress)=>{
            this.changeProgress(progress);
        });
        Pubsub.subscribe("CHANGE_REPEAT_TYPE",(msg)=>{
            this.changeRepeatType();
        });
    },

    componentWillUnmount : function(){
        // Pubsub.unsubscribe("GET_IS_PLAY");
        Pubsub.unsubscribe("SELECT_MUSIC_ITEM");
        Pubsub.unsubscribe("DELETE_MUSIC_ITEM");
        Pubsub.unsubscribe("PLAY_NEXT_MUSIC");
        Pubsub.unsubscribe("PLAY_PREV_MUSIC");
        Pubsub.unsubscribe("CHANGE_VOLUME");
        Pubsub.unsubscribe("CHANGE_REPEAT_TYPE");
        $('#player').unbind($.jPlayer.event.ended);
        $('#player').unbind($.jPlayer.event.timeupdate);
    },

    render : function(){
        return (
            <div className="view">
                <Header/>
                {React.cloneElement(this.props.children,{
                    currentMusicItem : this.state.currentMusicItem,
                    musicList : this.state.musicList,
                    repeatType : this.state.repeatType,
                    isPlay : this.state.isPlay,
                    progress : this.state.progress,
                    volume : this.state.volume,
                    duration : duration
                })}
            </div> 
        )
    }
});

export default App;