import React from 'react';
import './mod.scss';

var Mod = React.createClass({
    render : function(){
        let {name,titleName,children} = this.props;
        let arrName = titleName.split("|");
        return (
            <div className={`mod mod--${name}`}>
                <div className="mod-hd">
                    <h2 className="mod-tit">{/* {arrName[0]}<span>{arrName[1]}</span> */titleName}</h2>
                </div>
                <div className="mod-bd">
                    {children}
                </div>
            </div>
        )
    }
})

module.exports = Mod;