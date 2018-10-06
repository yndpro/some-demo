import React from 'react';
import Pubsub from 'pubsub-js';
import './play_list_item.scss';

var PlayListItem = React.createClass({

    selectItem : function(musicItem){
        Pubsub.publish("SELECT_MUSIC_ITEM",musicItem);
    },

    deleteItem : function(musicItem,e){
        e.stopPropogation();
        Pubsub.publish("DELETE_MUSIC_ITEM",musicItem);
    },

    handleSelectItem : function(musicItem){
        console.log("playItem:",musicItem);
        this.props.callbackSelectItem && this.props.callbackSelectItem(musicItem);
    },

    render : function(){
        var item = this.props.item;
        return (   
            <li className={`components-musiclistitem ${this.props.focus ? "focus" : ""}`} onClick={this.handleSelectItem.bind(this,item)}>
                <p><strong>{item.title}</strong> - {item.artist}</p>
                <p className="-col-auto delete" onClick={this.selectItem.bind(this,item)}></p>
            </li>
        )
    }
});

export default PlayListItem;