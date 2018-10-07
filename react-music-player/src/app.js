import React from 'react';
import Header from './components/header';
import Pubsub from 'pubsub-js';
import {MUSIC_LIST} from './data';

var App = React.createClass({
    getInitialState : function(){
        return {
            musicList : MUSIC_LIST,
            currentMusicItem : MUSIC_LIST[0],
            repeatType : "cycle"
        }
    },

    changeMusicItem : function(musicItem){
        $('#player').jPlayer('setMedia',{
            mp3: musicItem.file
        });
        this.setState({
            currentMusicItem : musicItem
        });
        this.playMusic();
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
        $('#player').jPlayer('play');
    },

    // getIsPlay : function(isPlay){
    //     this.setState({
    //         isPlay : isPlay
    //     });
    // },

    componentDidMount : function(){

        $('#player').jPlayer({
            supplied:'mp3',
            wmode:'window',
            volume : 50 * 0.01
        });

        let index;
        $('#player').bind($.jPlayer.event.ended,(e)=>{
            if(this.state.repeatType == "cycle"){
                this.playNext();
            }else if(this.state.repeatType == "cycle_one"){
                this.playMusic();
            }else if(this.state.repeatType == "random"){
                index = Math.floor(Math.random() * this.state.musicList.length);
                this.changeMusicItem(this.state.musicList[index]);
            }else{}           
        });

        this.changeMusicItem(this.state.currentMusicItem);

        Pubsub.subscribe("SELECT_MUSIC_ITEM",(msg,musicItem)=>{
            this.changeMusicItem(musicItem);
        });
        Pubsub.subscribe("DELETE_MUSIC_ITEM",(msg,musicItem)=>{
            this.deleteMusicItem(musicItem);
        });
        Pubsub.subscribe("PLAY_NEXT_MUSIC",(msg)=>{
            this.playNext();
        });
        Pubsub.subscribe("PLAY_PREV_MUSIC",(msg)=>{
            this.playNext("prev");
        });

        const repeatType = [
            "once",
            "cycle",
            "cycle_one",    
            "random"
        ];
        Pubsub.subscribe("CHANGE_REPEAT_TYPE",(msg)=>{
            let index = repeatType.indexOf(this.state.repeatType);
            index = (index + 1) % repeatType.length;
            this.setState({
                repeatType : repeatType[index]
            });
        });
    },

    componentWillUnmount : function(){
        Pubsub.unsubscribe("SELECT_MUSIC_ITEM");
        Pubsub.unsubscribe("DELETE_MUSIC_ITEM");
        Pubsub.unsubscribe("PLAY_NEXT_MUSIC");
        Pubsub.unsubscribe("PLAY_PREV_MUSIC");
        Pubsub.unsubscribe("CHANGE_REPEAT_TYPE");
        $('#player').unbind($.jPlayer.event.ended);
    },

    render : function(){
        return (
            <div className="view">
                <Header/>
                {React.cloneElement(this.props.children,{
                    currentMusicItem : this.state.currentMusicItem,
                    musicList : this.state.musicList,
                    repeatType : this.state.repeatType
                })}
            </div> 
        )
    }
});

export default App;