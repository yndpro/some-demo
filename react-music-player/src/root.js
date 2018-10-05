import React from 'react';
import Header from './components/header';
import Player from './page/player';
import PlayList from './page/play_list';
import {MUSIC_LIST} from './data';
import {Router,IndexRoute,Route,hashHistory,Link} from 'react-router';

var App = React.createClass({
    getInitialState : function(){
        return {
            musicList : MUSIC_LIST,
            currentMusicItem : MUSIC_LIST[5]
        }
    },

    componentDidMount : function(){
        // var _this = this;
        // $('#player').jPlayer({
        //     supplied:'mp3',
        //     wmode:'window',
        //     volume : 50 * 0.01,
        //     ready : function(){
        //         $(this).jPlayer('setMedia',{
        //             mp3: _this.state.currentMusicItem.file
        //         });
        //         $(this).jPlayer('play');
        //     }
        // });
    },

    render : function(){
        return (
            <div className="view">
                <Header/>
                {React.cloneElement(this.props.children,this.state)}
                {/* <PlayList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList}/> */}
                {/* <Player currentMusicItem={this.state.currentMusicItem}/> */}
            </div>
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