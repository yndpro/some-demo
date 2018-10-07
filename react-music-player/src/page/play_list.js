import React from 'react';
import PlayListItem from '../components/play_list_item';

var PlayList = React.createClass({
    componentDidMount : function(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    },

    render : function(){
        return (
            <div className="page page--playerList">
                <ul>
                    {
                        this.props.musicList.map(item => {
                            return <PlayListItem key={item.id} item={item} focus={item == this.props.currentMusicItem ? true : false}/>
                        })
                    }
                </ul>
            </div>
        )
    }
});

export default PlayList;