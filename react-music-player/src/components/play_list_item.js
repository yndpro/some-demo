import React from 'react';
import './play_list_item.scss';

var PlayListItem = React.createClass({
    render : function(){
        var item = this.props.item;
        return (   
            <li className={`components-musiclistitem ${this.props.focus ? "focus" : ""}`}>
                <p><strong>{item.title}</strong> - {item.artist}</p>
                <p className="-col-auto delete"></p>
            </li>
        )
    }
});

export default PlayListItem;