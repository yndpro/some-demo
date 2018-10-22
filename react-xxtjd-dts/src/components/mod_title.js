import React from 'react';

var ModTitle = React.createClass({
    render : function(){
        let arrName = this.props.name.split("|");
        return (
            <h2 className="mod-tit">{arrName[0]}<span>{arrName[1]}</span><i className={this.props.bullet == "left" ? `mod-bullet-l` : `mod-bullet-r`}></i></h2>
        )
    }
})

module.exports = ModTitle;