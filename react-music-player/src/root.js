import React from 'react';
import Header from './components/header';
import Player from './page/player';
import PlayList from './page/play_list';
import Pubsub from 'pubsub-js';
import {MUSIC_LIST} from './data';
import {Router,IndexRoute,Route,hashHistory,Link} from 'react-router';

var App = React.createClass({
    getInitialState : function(){
        return {
            musicList : MUSIC_LIST,
            currentMusicItem : MUSIC_LIST[0]
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

    playMusic : function(){
        $('#player').jPlayer('play');
    },

    callbackSelectItem : function(musicItem){
        console.log("app:",musicItem);
        this.changeMusicItem(musicItem);
    },

    componentDidMount : function(){

        $('#player').jPlayer({
            supplied:'mp3',
            wmode:'window',
            volume : 50 * 0.01
        });

        this.changeMusicItem(this.state.currentMusicItem);

        // Pubsub.subscribe("SELECT_MUSIC_ITEM",(msg,musicItem)=>{
        //     this.changeMusicItem(musicItem);
        // });
    },

    componentWillUnmount : function(){
        Pubsub.unsubscribe("SELECT_MUSIC_ITEM");
    },

    render : function(){
        console.log(this.props.children);
        return (
            <Router history={hashHistory}>
                <div className="view">
                    <Header/>
                    {React.cloneElement(this.props.route.component,{
                        currentMusicItem : this.state.currentMusicItem
                    })}
                    {/* {React.cloneElement(this.props.children[1],{
                        currentMusicItem : this.state.currentMusicItem,
                        musicList : this.state.musicList,
                        callbackSelectItem : this.callbackSelectItem
                    })} */}
                </div>
            </Router>
        )
    }
});

var Root = React.createClass({
    render : function(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={PlayList}></Route>
                </Route>
            </Router>
        )
    }
});

export default Root;