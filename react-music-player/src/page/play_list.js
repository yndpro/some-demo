import React from 'react';
import PlayListItem from '../components/play_list_item';

var PlayList = React.createClass({
    componentDidMount : function(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    },

    callbackSelectItem : function(musicItem){
        console.log("playlist:",musicItem);
        this.props.callbackSelectItem && this.props.callbackSelectItem(musicItem);
    },

    render : function(){
        return (
            <div className="page page--playerList">
                <ul>
                    {
                        this.props.musicList.map(item => {
                            return <PlayListItem key={item.id} item={item} callbackSelectItem={this.callbackSelectItem} focus={item == this.props.currentMusicItem ? true : false}/>
                        })
                    }
                </ul>
            </div>
        )
    }
});

export default PlayList;