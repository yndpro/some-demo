import React from 'react';
import './wg_mod.scss';

var WgMod = React.createClass({
    render : function(){
        let {title,children} = this.props;
        return (
            <div className={`wg-mod`}>
                <div className="wg-mod-hd">
                    <h2 className="wg-mod-tit">{title}</h2>
                </div>
                <div className="wg-mod-bd">
                    {children}
                </div>
            </div>
        )
    }
})

module.exports = WgMod;