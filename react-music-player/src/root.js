import React from 'react';
import Header from './components/header';
import Player from './page/player';
import {MUSIC_LIST} from './data';

var Root = React.createClass({
    getInitialState : function(){
        return {
            musicList : MUSIC_LIST,
            currentMusicItem : MUSIC_LIST[5]
        }
    },

    componentDidMount : function(){
        var _this = this;
        $('#player').jPlayer({
            supplied:'mp3',
            wmode:'window',
            ready : function(){
                $(this).jPlayer('setMedia',{
                    mp3: _this.state.currentMusicItem.file
                }).jPlayer('play');
            }
        });
    },

    render : function(){
        return (
            <div className="view">
                <Header/>
                <Player currentMusicItem={this.state.currentMusicItem} isPlay={this.state.isPlay}/>
            </div>
        )
    }
});

export default Root;