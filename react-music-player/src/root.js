import React from 'react';
import Header from './components/header';
import Player from './page/player';
import PlayList from './page/play_list';
import {MUSIC_LIST} from './data';

var Root = React.createClass({
    getInitialState : function(){
        return {
            musicList : MUSIC_LIST,
            currentMusicItem : MUSIC_LIST[4]
        }
    },

    componentDidMount : function(){
        
    },

    render : function(){
        return (
            <div className="view">
                <Header/>
                <PlayList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList}/>
                {/* <Player currentMusicItem={this.state.currentMusicItem}/> */}
            </div>
        )
    }
});

export default Root;